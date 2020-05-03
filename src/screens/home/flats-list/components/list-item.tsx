import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { IFlat } from 'src/typings';
import { useNavigation } from '@react-navigation/core';
import { ROUTES, COLORS } from '../../../../constants';

export const FlatItem = ({ flat }: { flat: IFlat }) => {
  const navigation = useNavigation();

  const onItemPress = () => {
    navigation.navigate(ROUTES.FlatDetails, {
      id: flat.id,
      address: flat.address,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onItemPress}>
      <Text style={{ color: '#000', fontSize: 16 }}>{flat.address}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingLeft: 12,
    borderBottomWidth: 0.5,
    borderColor: COLORS.descriptionsColors,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
});
