import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IBillHistory, IBillsAgreement } from '../../../typings';
import { FlatSection } from './section';
import { useNavigation } from '@react-navigation/core';
import { ROUTES } from '../../../constants';

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
      billHistory: props.bills.filter((bill) => bill.bill === billName).reverse(),
    });
  };

  return (
    <FlatSection name="Bills" onAddPress={addBillHistory}>
      {props.bills.length ? (
        <>
          <View style={styles.row}>
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
              style={styles.row}
              key={bill.id}
            >
              <Text style={{ flex: 1.5 }}>
                {new Date(bill.date).toLocaleDateString()}
              </Text>
              <Text style={{ flex: 1 }}>{bill.bill}</Text>
              <Text style={{ flex: 1 }}>{bill.value}</Text>
              <Text style={{ flex: 1.2 }}>{bill.difference}</Text>
              <Text style={{ flex: 0.9 }}>{bill.rate}</Text>
              <Text style={{ flex: 0.8 }}>{bill.total.toFixed()}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No bills yet</Text>
        </View>
      )}
    </FlatSection>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
