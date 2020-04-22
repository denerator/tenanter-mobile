import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { homeService } from '../../home.service';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { HomeStackParamsList } from '../..';
import { ROUTES } from '../../../../constants';
import { RouteProp } from '@react-navigation/core';

type IProps = {
  navigation: StackNavigationProp<HomeStackParamsList, ROUTES.Home>;
  route: RouteProp<HomeStackParamsList, ROUTES.Home>;
};

export const AddFlatScreen = ({ navigation, route }: IProps) => {
  const [address, setAddress] = React.useState('');

  const onInputChange = (key: string, value: string) => {
    setAddress(value);
  };

  const onSubmit = async () => {
    try {
      const { data } = await homeService.createFlat(address, 1);
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Error');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter flat address</Text>
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
});
