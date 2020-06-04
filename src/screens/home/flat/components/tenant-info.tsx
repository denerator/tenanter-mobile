import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { ITenant } from 'src/typings';
import { FlatSection } from './section';
import { useNavigation } from '@react-navigation/core';
import { ROUTES, globalStyles } from '../../../../constants';

export const TenantInfo = ({
  tenant,
  flat,
  toPay,
}: {
  tenant: ITenant | null;
  flat: number;
  toPay: number;
}) => {
  const navigation = useNavigation();

  const editTenant = () => {
    navigation.navigate(ROUTES.EditTenant, { tenant, flat });
  };

  const callTenant = () => {
    if (!tenant) {
      return;
    }
    Linking.openURL(`tel:${tenant.phone}`);
  };
  return (
    <FlatSection name="Tenant" onAddPress={editTenant}>
      {tenant ? (
        <View style={styles.row}>
          <View style={styles.userPhoto}></View>
          <View>
            <Text style={styles.title}>{tenant.name}</Text>
            <TouchableOpacity onPress={callTenant}>
              <Text style={styles.title}>{tenant.phone}</Text>
            </TouchableOpacity>
            <Text>Contract time: {tenant.contract_time}</Text>
            <Text>Payment day: {tenant.payment_day}</Text>
            <Text>Deposit: {tenant.deposit}$</Text>
            <Text>Rental rate: {tenant.rental_rate}$</Text>
            <Text>To pay: {toPay}$</Text>
          </View>
        </View>
      ) : (
        <View style={globalStyles.centerBox}>
          <Text>No tenant yet</Text>
        </View>
      )}
    </FlatSection>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userPhoto: {
    width: 155,
    height: 155,
    borderRadius: 77.5,
    backgroundColor: 'lightgrey',
  },
});
