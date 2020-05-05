import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants';

interface IInputProps {
  value: string;
  onTextChange?: (key: string, value: string) => void;
  secureTextEntry?: boolean;
  option: string;
  disabled?: boolean;
  onFocus?(): void;
  onPress?(): void;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  placeholder: string;
  maxLength?: number;
  placeholderTextColor?: string;
  onBlur?(option: string): void;
}

export enum InputTypes {
  Info = 'info',
  Password = 'password',
  Map = 'map',
  None = 'None',
  Email = 'Email',
}

export const Input = (props: IInputProps) => {
  const {
    onTextChange,
    secureTextEntry,
    option,
    disabled,
    style,
    placeholder,
    value,
    placeholderTextColor,
    maxLength,
    borderColor,
    onBlur,
    onPress,
  } = props;

  const getKeyboardType = (option: string) => {
    switch (option) {
      case 'email':
        return 'email-address';
      case 'expMonth':
      case 'expYear':
      case 'phone':
      case 'cardNumber':
      case 'cvc':
      case 'rate':
      case 'contract_time':
      case 'deposit':
      case 'payment_day':
      case 'rental_rate':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const onChange = (value: string) =>
    onTextChange && onTextChange(option, value);

  const onSetTouched = () => onBlur && onBlur(option);

  const containerStyle = StyleSheet.flatten([
    styles.iconSection,
    style,
    { borderColor: borderColor || COLORS.darkBlue },
  ]);

  return (
    <View style={containerStyle}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        placeholderTextColor={placeholderTextColor}
        value={value}
        editable={!disabled}
        keyboardType={getKeyboardType(option)}
        onBlur={onSetTouched}
        onFocus={props.onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 15,
    letterSpacing: 0.5,
    width: '80%',
    height: 59,
    fontSize: 17,
  },
  iconSection: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  icon: {
    paddingRight: 14,
    paddingTop: 14,
    color: COLORS.grey,
  },
});
