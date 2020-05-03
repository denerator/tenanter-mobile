import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const AddFlatBtn = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 30,
  },
  button: {
    fontSize: 30,
  },
});
