import * as React from 'react';
import { View, Text } from 'react-native';
import { IBillsAgreement } from '../../../../typings';
import { FlatSection } from './section';
import { useNavigation } from '@react-navigation/core';
import { ROUTES, globalStyles } from '../../../../constants';

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
      onAddPress={goToBillCreation}
    >
      {bills.length ? (
        <>
          <View style={globalStyles.tableRow}>
            <Text style={{ flex: 1 }}>Bill</Text>
            <Text style={{ flex: 1 }}>Rate</Text>
            <Text style={{ flex: 1 }}>Is dynamic</Text>
          </View>
          {bills.map((bill) => (
            <View style={globalStyles.tableRow} key={bill.id}>
              <Text style={{ flex: 1 }}>{bill.name}</Text>
              <Text style={{ flex: 1 }}>{bill.rate}</Text>
              <Text style={{ flex: 1 }}>
                {bill.is_dynamic ? 'Dynamic' : 'Static'}
              </Text>
            </View>
          ))}
        </>
      ) : (
        <View style={globalStyles.centerBox}>
          <Text>No bills agreement yet</Text>
        </View>
      )}
    </FlatSection>
  );
};
