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
import { ROUTES } from '../../../constants';
import { number } from 'prop-types';

export const TenantInfo = ({
  tenant,
  flat,
}: {
  tenant: ITenant | null;
  flat: number;
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
    <FlatSection name="Tenant" onAddPress={editTenant} isAddVisible={true}>
      {tenant ? (
        <>
          <Text style={styles.title}>{tenant.name}</Text>
          <TouchableOpacity onPress={callTenant}>
            <Text style={styles.title}>{tenant.phone}</Text>
          </TouchableOpacity>
          <Text>Rental rate: {tenant.rental_rate}</Text>
          <Text>Payment day: {tenant.payment_day}</Text>
          <Text>Deposit: {tenant.deposit}</Text>
          <Text>Contract time: {tenant.contract_time}</Text>
        </>
      ) : (
        <View style={styles.emptyContainer}>
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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
