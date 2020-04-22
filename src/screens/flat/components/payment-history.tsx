import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IPayment } from '../../../typings';
import { FlatSection } from './section';

export const PaymentHiStory = ({
  paymentHistory,
  onPay,
}: {
  paymentHistory: IPayment[];
  onPay: () => void;
}) => {
  return (
    <FlatSection isAddVisible={true} onAddPress={onPay} name="Payments">
      {paymentHistory.length ? (
        <>
          <View style={styles.row}>
            <Text style={{ flex: 1 }}>Date</Text>
            <Text style={{ flex: 1.5 }}>Tenant</Text>
            <Text style={{ flex: 1 }}>Bills sum</Text>
            <Text style={{ flex: 0.6 }}>Total</Text>
          </View>
          {paymentHistory.map((payment) => (
            <View style={styles.row} key={payment.id}>
              <Text style={{ flex: 1 }}>
                {new Date(payment.date).toLocaleDateString()}
              </Text>
              <Text style={{ flex: 1.5 }}>{payment.tenant}</Text>
              <Text style={{ flex: 1 }}>{payment.bills}</Text>
              <Text style={{ flex: 0.6 }}>{payment.total}</Text>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No payments yet</Text>
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
