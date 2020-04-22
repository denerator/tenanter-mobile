import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IBillsAgreement } from '../../../typings';
import { FlatSection } from './section';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../../constants';

export const BillsAgreement = ({
  bills,
  flat,
}: {
  bills: IBillsAgreement[];
  flat: number;
}) => {
  const navigation = useNavigation();

  const goToBillCreation = () => {
    navigation.navigate(ROUTES.CreateBill, {
      bills,
      flat,
    });
  };

  return (
    <FlatSection
      name="Bills agreement"
      isAddVisible={true}
      onAddPress={goToBillCreation}
    >
      {bills.length ? (
        <>
          <View style={styles.row}>
            <Text style={{ flex: 1 }}>Bill</Text>
            <Text style={{ flex: 1 }}>Rate</Text>
            <Text style={{ flex: 1 }}>Is dynamic</Text>
          </View>
          {bills.map((bill) => (
            <View style={styles.row} key={bill.id}>
              <Text style={{ flex: 1 }}>{bill.name}</Text>
              <Text style={{ flex: 1 }}>{bill.rate}</Text>
              <Text style={{ flex: 1 }}>
                {bill.is_dynamic ? 'Dynamic' : 'Static'}
              </Text>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No bills agreement yet</Text>
        </View>
      )}
    </FlatSection>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
