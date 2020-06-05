import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Input, Button } from '../../../components';
import { flatService } from '../../../services/flat.service';
import { ITenant } from 'src/typings';
import { flatStore } from '../flat/flat.store';

const initialState = {
  signing_date: new Date().toISOString().substring(0, 10),
  payment_day: '',
  contract_time: '',
  rental_rate: '',
  deposit: '',
  name: '',
  phone: '',
  flat: null,
};

export const EditTenant = ({ navigation, route }) => {
  const {
    tenant,
    flat,
  }: { tenant: ITenant | null; flat: number } = route.params;
  const [state, setState] = React.useState({
    ...initialState,
    flat,
    ...tenant,
  });

  const onInputChange = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const onSubmit = async () => {
    try {
      let response: ITenant;
      if (tenant) {
        const { data } = await flatService.updateTenant({
          id: tenant.id,
          ...state,
          payment_day: +state.payment_day,
          contract_time: +state.contract_time,
          rental_rate: +state.rental_rate,
          deposit: +state.deposit,
        });
        response = data;
      } else {
        const { data } = await flatService.saveTenant({
          ...state,
          payment_day: +state.payment_day,
          contract_time: +state.contract_time,
          rental_rate: +state.rental_rate,
          deposit: +state.deposit,
        });
        response = data;
      }
      flatStore.tenant = response;
      flatService.updateFlatTenantInList(flat, response);
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error.response.data[0]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Provide the data</Text>
          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Tenant Name</Text>
              <Input
                value={state.name}
                secureTextEntry={false}
                placeholder="Tenant name"
                option="name"
                onTextChange={onInputChange}
              />
            </View>
            <View>
              <Text style={styles.label}>Tenant Phone</Text>
              <Input
                value={state.phone}
                secureTextEntry={false}
                placeholder="Tenant phone"
                option="phone"
                onTextChange={onInputChange}
              />
            </View>
            <View>
              <Text style={styles.label}>Signing Date</Text>
              <Input
                value={state.signing_date}
                secureTextEntry={false}
                placeholder="Signing Date"
                option="signing_date"
                onTextChange={onInputChange}
              />
            </View>
            <View>
              <Text style={styles.label}>Contract time</Text>
              <Input
                value={state.contract_time.toString()}
                secureTextEntry={false}
                placeholder="Contract Time"
                option="contract_time"
                onTextChange={onInputChange}
              />
            </View>
            <View>
              <Text style={styles.label}>Payment day</Text>
              <Input
                value={state.payment_day.toString()}
                secureTextEntry={false}
                placeholder="5"
                option="payment_day"
                onTextChange={onInputChange}
              />
            </View>
            <View>
              <Text style={styles.label}>Rental Rate</Text>
              <Input
                value={state.rental_rate.toString()}
                secureTextEntry={false}
                placeholder="Rental Rate"
                option="rental_rate"
                onTextChange={onInputChange}
              />
            </View>
            <View>
              <Text style={styles.label}>Deposit</Text>
              <Input
                value={state.deposit.toString()}
                secureTextEntry={false}
                placeholder="Deposit"
                option="deposit"
                onTextChange={onInputChange}
              />
            </View>
            <Button
              text="Save"
              onPress={onSubmit}
              disabled={!state.name.length}
              containerStyles={styles.submit}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: '5%',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingLeft: '10%',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  submit: {
    marginTop: 30,
    width: '80%',
  },
  dropdown: {
    marginBottom: 30,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
});
