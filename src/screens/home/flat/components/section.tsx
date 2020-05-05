import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';
import { Plus } from './plus';

interface IProps {
  name: string;
  onAddPress: () => void;
  children: any;
}

export const FlatSection = (props: IProps) => {
  const [isExpanded, setExpanded] = React.useState(true);
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{props.name}</Text>
        <Plus onPress={props.onAddPress} />
      </View>
      {isExpanded && <View style={styles.content}>{props.children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: COLORS.lightBlue,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  sectionTitle: {
    fontSize: 17,
    color: COLORS.white,
    fontWeight: '500',
  },
  sectionContainer: {
    justifyContent: 'center',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: '10%',
  },
});
