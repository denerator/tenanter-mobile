import * as React from 'react';
import { View, Text } from 'react-native';
import { IPayment } from '../../../../typings';
import { FlatSection } from './section';
import { globalStyles } from '../../../../constants';

export const PaymentHiStory = ({
  paymentHistory,
  onPay,
}: {
  paymentHistory: IPayment[];
  onPay: () => void;
}) => {
  return (
    <FlatSection onAddPress={onPay} name="Payments">
      {paymentHistory.length ? (
        <>
          <View style={globalStyles.tableRow}>
            <Text style={{ flex: 1 }}>Date</Text>
            <Text style={{ flex: 1.5 }}>Tenant</Text>
            <Text style={{ flex: 1 }}>Bills sum</Text>
            <Text style={{ flex: 0.6 }}>Total</Text>
          </View>
          {paymentHistory.map((payment) => (
            <View style={globalStyles.tableRow} key={payment.id}>
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
        <View style={globalStyles.centerBox}>
          <Text>No payments yet</Text>
        </View>
      )}
    </FlatSection>
  );
};
