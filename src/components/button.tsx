import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { COLORS } from '../constants';

interface IButtonProps {
  text: string;
  onPress(): void;
  disabled: boolean;
  color?: string;
  backgroundColor?: string;
  containerStyles?: StyleProp<ViewStyle>;
}

export const Button = (props: IButtonProps) => {
  const { onPress, disabled, color, backgroundColor, containerStyles } = props;

  const disabledStyle = StyleSheet.flatten([
    styles.text,
    {
      color: disabled ? COLORS.lightGrey : color || COLORS.white,
    },
  ]);

  const containerStyle = StyleSheet.flatten([
    styles.container,
    containerStyles,
    {
      borderColor: color || COLORS.lightBlue,
      backgroundColor: backgroundColor || COLORS.lightBlue,
    },
  ]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
      disabled={disabled}
    >
      <Text style={disabledStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.lightBlue,
    borderWidth: 2,
    borderRadius: 140,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 8,
  },
  text: {
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
});
