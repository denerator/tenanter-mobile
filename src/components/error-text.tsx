import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface IErrorProps {
  text: string;
}

export const ErrorText = (props: IErrorProps) => {
  return <Text style={styles.errorMessage}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: 12,
  },
});
