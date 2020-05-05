import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { flatService } from '../../../services/flat.service';
import { Input, Button } from '../../../components';
import { globalStyles } from '../../../constants';
import { from } from 'rxjs';

export const AddFlatScreen = ({ navigation }) => {
  const [address, setAddress] = React.useState('');

  const onInputChange = (key: string, value: string) => {
    setAddress(value);
  };

  const onSubmit = () => {
    from(flatService.createFlat(address, 1)).subscribe(
      ({ data }) => {
        flatService.addNewFlat(data);
        navigation.goBack();
      },
      (error) => {
        console.log(error.response.data, 'FLAT_CREATION_ERROR');
        Alert.alert('Error');
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={globalStyles.h2}>Enter flat address</Text>
        <View style={styles.form}>
          <Input
            value={address}
            secureTextEntry={false}
            placeholder="Address"
            option="address"
            onTextChange={onInputChange}
          />
          <Button
            text="Save"
            onPress={onSubmit}
            disabled={address.length < 5}
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
});
