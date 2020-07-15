import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { IFlat } from 'src/typings';
import { useNavigation } from '@react-navigation/core';
import { ROUTES, COLORS, globalStyles } from '../../../../constants';

export const FlatItem = ({ flat }: { flat: IFlat }) => {
  const navigation = useNavigation();

  const onItemPress = () => {
    navigation.navigate(ROUTES.FlatDetails, flat);
  };

  const getPaymentDay = () => {
    switch (flat.days_before_payment) {
      case 0:
        return 'Today';
      case 1:
        return 'Tomorrow';
      default:
        return `In ${flat.days_before_payment} days`;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onItemPress}>
      <View style={globalStyles.row}>
        <View style={styles.flatPhoto}></View>
        <View>
          <Text style={styles.flatName}>{flat.address}</Text>
          <Text style={styles.description}>
            {flat.tenant ? `Payment day: ${getPaymentDay()}` : 'No tenant'}
          </Text>
        </View>
      </View>
      {flat.tenant ? (
        <Text style={styles.price}>{flat.tenant.rental_rate}$</Text>
      ) : null}
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
    justifyContent: 'space-between',
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
    marginBottom: 4,
  },
  description: {
    color: 'grey',
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
});
