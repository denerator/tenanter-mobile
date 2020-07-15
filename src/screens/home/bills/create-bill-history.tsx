import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Input, Button } from '../../../components';
import { flatService } from '../../../services/flat.service';
import { globalStyles } from '../../../constants';
import { flatStore } from '../flat/flat.store';

export const BillHistoryCreation = ({ navigation, route }) => {
  const { flat, billsAgreement } = route.params;

  const { billsMap, billsNames } = billsAgreement.reduce(
    (acc, agreement) => {
      return {
        billsMap: {
          ...acc.billsMap,
          [agreement.id]: agreement.is_dynamic,
        },
        billsNames: [
          ...acc.billsNames,
          {
            label: agreement.name,
            value: agreement.id,
          },
        ],
      };
    },
    {
      billsMap: {},
      billsNames: [],
    }
  );

  const [bill, setBill] = React.useState(billsNames[0].value);
  const [value, setValue] = React.useState('');

  const onInputChange = (key: string, value: string) => {
    setValue(value);
  };

  const onSubmit = async () => {
    try {
      const { data } = await flatService.saveBillValue({
        flat,
        bill,
        value: +value,
      });
      flatStore.addBillHistory(data);
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error.response.data[0]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={globalStyles.h2}>Provide the data</Text>
        <View style={styles.dropdown}>
          <Dropdown
            label="Bill"
            data={billsNames}
            value={bill}
            containerStyle={{ width: '80%' }}
            onChangeText={setBill}
          />
        </View>
        <View style={styles.form}>
          {billsMap[bill.toString()] ? (
            <Input
              value={value}
              secureTextEntry={false}
              placeholder="Value"
              option="phone"
              onTextChange={onInputChange}
            />
          ) : (
            <View></View>
          )}
          <Button
            text="Save"
            onPress={onSubmit}
            disabled={billsMap[bill.toString()] && !value.length}
            containerStyles={styles.submit}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 120,
    paddingHorizontal: '5%',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  submit: {
    marginTop: 30,
    width: '80%',
  },
  dropdown: {
    marginBottom: 30,
    alignItems: 'center',
  },
});
