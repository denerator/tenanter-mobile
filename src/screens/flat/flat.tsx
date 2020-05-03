import * as React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { COLORS } from '../../constants';
import { flatService } from './flat.service';
import { IFlatDetails } from '../../typings';
import {
  TenantInfo,
  FlatSection,
  BillsHiStory,
  PaymentHiStory,
  BillsAgreement,
} from './components';

export const FlatDetailsScreen = ({ navigation, route }) => {
  const [flat, setFlat] = React.useState<IFlatDetails | null>(null);
  const { id, address } = route.params;

  const getFlat = async () => {
    try {
      const { data } = await flatService.getFlatDetails(id);
      setFlat(data);
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Error');
    }
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
      setFlat({
        ...flat,
        payment_history: [...flat.payment_history, data],
      });
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error.response.data[0]);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFlat();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <>
          <Text style={styles.title}>{address}</Text>
          {flat ? (
            <>
              <TenantInfo flat={flat.id} tenant={flat.tenant} />
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
            <Text> Loading</Text>
          )}
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
