import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { globalStyles } from '../../../constants';

export const SingleBillHistory = ({ navigation, route }) => {
  const { billHistory } = route.params;

  const renderBillItem = ({ item, index }) => (
    <View style={globalStyles.tableRow}>
      <Text style={{ flex: 1.5 }}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      <Text style={{ flex: 1 }}>{item.bill}</Text>
      <Text style={{ flex: 1 }}>{item.value ? item.value : '-'}</Text>
      <Text style={{ flex: 1.2 }}>
        {item.difference ? item.difference : '-'}
      </Text>
      <Text style={{ flex: 0.9 }}>{item.rate}</Text>
      <Text style={{ flex: 0.8 }}>{item.total.toFixed()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{billHistory[0].bill}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
        data={billHistory}
        renderItem={renderBillItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 40,
  },
});
