import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from 'react-native';
import { Input, Button } from '../../../components';
import { flatService } from '../../../services/flat.service';
import { globalStyles } from '../../../constants';
import { flatStore } from '../flat/flat.store';

const initialState = {
  name: '',
  is_dynamic: false,
  rate: '',
};

export const BillCreation = ({ navigation, route }) => {
  const { bills, flat } = route.params;
  const [state, setState] = React.useState(initialState);

  const onInputChange = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const onSubmit = async () => {
    if (
      bills.find((bill) => bill.name.toLowerCase() === state.name.toLowerCase())
    ) {
      Alert.alert('You already have bill with this name');
      return;
    }
    const { name, is_dynamic, rate } = state;
    try {
      const { data } = await flatService.saveBill({
        name,
        rate: +rate,
        is_dynamic,
        flat,
      });
      flatStore.addBillAgreement(data);
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error.response.data[0]);
    }
  };

  const toggleSwitch = () => {
    setState({
      ...state,
      is_dynamic: !state.is_dynamic,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={globalStyles.h2}>Provide the data</Text>
        <View style={styles.form}>
          <Input
            value={state.name}
            secureTextEntry={false}
            placeholder="Bill name"
            option="name"
            onTextChange={onInputChange}
          />
          <Input
            value={state.rate}
            secureTextEntry={false}
            placeholder="Bill rate"
            option="rate"
            onTextChange={onInputChange}
          />
          <View style={styles.row}>
            <Text>Is Dynamic: </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={state.is_dynamic ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={state.is_dynamic}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});
