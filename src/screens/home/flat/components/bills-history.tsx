import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IBillHistory, IBillsAgreement } from '../../../../typings';
import { FlatSection } from './section';
import { useNavigation } from '@react-navigation/core';
import { ROUTES, globalStyles } from '../../../../constants';

export const BillsHiStory = (props: {
  bills: IBillHistory[];
  billsAgreement: IBillsAgreement[];
  flat: number;
}) => {
  const navigation = useNavigation();

  const addBillHistory = () => {
    if (!props.billsAgreement.length) {
      return;
    }
    navigation.navigate(ROUTES.AddBillHistory, {
      flat: props.flat,
      billsAgreement: props.billsAgreement,
    });
  };

  const getSingleHistory = (billName: string) => {
    navigation.navigate(ROUTES.SingleBillHistory, {
      billHistory: props.bills
        .filter((bill) => bill.bill === billName)
        .reverse(),
    });
  };

  return (
    <FlatSection name="Bills" onAddPress={addBillHistory}>
      {props.bills.length ? (
        <>
          <View style={globalStyles.tableRow}>
            <Text style={{ flex: 1.5 }}>Date</Text>
            <Text style={{ flex: 1 }}>Bill</Text>
            <Text style={{ flex: 1 }}>Value</Text>
            <Text style={{ flex: 1.6 }}>Difference</Text>
            <Text style={{ flex: 1 }}>Rate</Text>
            <Text style={{ flex: 1 }}>Total</Text>
          </View>
          {props.bills.map((bill) => (
            <TouchableOpacity
              onPress={() => getSingleHistory(bill.bill)}
              style={globalStyles.tableRow}
              key={bill.id}
            >
              <Text style={{ flex: 1.5 }}>
                {new Date(bill.date).toLocaleDateString()}
              </Text>
              <Text style={{ flex: 1 }}>{bill.bill}</Text>
              <Text style={{ flex: 1 }}>{bill.value ? bill.value : '-'}</Text>
              <Text style={{ flex: 1.2 }}>
                {bill.difference ? bill.difference : '-'}
              </Text>
              <Text style={{ flex: 0.9 }}>{bill.rate}</Text>
              <Text style={{ flex: 0.8 }}>{bill.total.toFixed()}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={globalStyles.centerBox}>
          <Text>No bills yet</Text>
        </View>
      )}
    </FlatSection>
  );
};
