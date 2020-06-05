import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../../constants';
import { flatService } from '../../../services/flat.service';
import { IFlatDetails } from '../../../typings';
import {
  TenantInfo,
  BillsHiStory,
  PaymentHiStory,
  BillsAgreement,
} from './components';
import { flatStore } from './flat.store';
import { from } from 'rxjs';

export const FlatDetailsScreen = ({ navigation, route }) => {
  const { id, address, tenant, owner } = route.params;
  const [flat, setFlat] = React.useState<IFlatDetails>({
    id,
    tenant,
    owner,
    address,
    days_before_payment: 0,
    bills_agreement: [],
    bills_history: [],
    payment_history: [],
    to_pay: 0,
  });
  const [isLoading, setLoading] = React.useState(false);

  const getFlat = () => {
    setLoading(true);
    from(flatService.getFlatDetails(id)).subscribe(
      ({ data }) => {
        flatStore.next(data);
      },
      (error) => {
        console.log(error.response.data);
        Alert.alert('Error');
      },
      () => {
        setLoading(false);
      }
    );
  };

  const askForPay = () => {
    if (!flat || !flat.tenant) {
      Alert.alert('Add tenant first');
      return;
    }
    Alert.alert(
      'The payment will be saved on ' +
        new Date().toISOString().substring(0, 10),
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'OK', onPress: () => payWithCurrentDate() },
      ]
    );
  };

  const payWithCurrentDate = async () => {
    if (!flat || !flat.tenant) {
      return;
    }
    const date = new Date().toISOString().substring(0, 10);
    try {
      const { data } = await flatService.savePayment({
        date,
        flat: flat.id,
        tenant: flat.tenant.id,
      });
      flatStore.addPaymentRecord(data);
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error.response.data[0]);
    }
  };

  React.useEffect(() => {
    const flatSubscription = flatStore.subscribe((data) => {
      if (!data) {
        return;
      }
      setFlat({ ...data });
    });
    getFlat();

    return () => flatSubscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <>
          <Text style={styles.title}>{address}</Text>

          <>
            <TenantInfo toPay={flat.to_pay} flat={flat.id} tenant={flat.tenant} />
            {!isLoading ? (
              <>
                <BillsHiStory
                  flat={flat.id}
                  bills={flat.bills_history}
                  billsAgreement={flat.bills_agreement}
                />
                <PaymentHiStory
                  paymentHistory={flat.payment_history}
                  onPay={askForPay}
                />
                <BillsAgreement flat={flat.id} bills={flat.bills_agreement} />
              </>
            ) : (
              <View style={[styles.emptyContainer, { flex: 1 }]}>
                <ActivityIndicator size="large" color={COLORS.lightBlue} />
              </View>
            )}
          </>
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    paddingTop: 60,
    paddingLeft: '10%',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 40,
  },
  sectionTitle: {
    paddingLeft: '15%',
    fontSize: 17,
    fontWeight: '500',
  },
  sectionContainer: {
    justifyContent: 'center',
    backgroundColor: COLORS.lightBlue,
    paddingVertical: 18,
    marginBottom: 30,
  },
  form: {
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
