import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';

export const Loading = () => {
  return (
    <SafeAreaView>
      <Text>Loading screen</Text>
      <TouchableOpacity onPress={() => console.log('Log')}><Text>Loading</Text></TouchableOpacity>
    </SafeAreaView>
  );
};
