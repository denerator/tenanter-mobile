import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { IFlat } from 'src/typings';
import { useNavigation } from '@react-navigation/core';
import { ROUTES, COLORS, globalStyles } from '../../../../constants';

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
      <View style={styles.flatPhoto}></View>
      <Text style={styles.flatName}>{flat.address}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderColor: COLORS.descriptionsColors,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatPhoto: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 15,
    marginRight: 45,
  },
  flatName: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
});
