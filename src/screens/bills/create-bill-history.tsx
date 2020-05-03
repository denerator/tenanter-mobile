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
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { flatService } from '../flat/flat.service';

export const BillHistoryCreation = ({ navigation, route }) => {
  const { flat, billsAgreement } = route.params;
  const billsNames = billsAgreement.map((bill) => ({
    label: bill.name,
    value: bill.id,
  }));
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
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error.response.data[0]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Provide the data</Text>
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
          <Input
            value={value}
            secureTextEntry={false}
            placeholder="Value"
            option="phone"
            onTextChange={onInputChange}
          />
          <Button
            text="Save"
            onPress={onSubmit}
            disabled={!value.length}
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
  title: {
    paddingLeft: '10%',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 40,
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
