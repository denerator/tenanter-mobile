import * as React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { from } from 'rxjs';
import { IFlat } from 'src/typings';
import { flatService } from '../../../services/flat.service';
import { FlatItem } from './components/list-item';
import { COLORS } from '../../../constants';

export const FlatsList = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [flats, setFlats] = React.useState<IFlat[]>([]);

  const getFlats = () => {
    setRefreshing(true);
    from(flatService.getFlats(1)).subscribe(
      // Hard-coded user id
      ({ data }) => {
        flatService.flats.next(data);
        setRefreshing(false);
      },
      (error) => {
        setRefreshing(false);
        console.log(error.response.data);
        Alert.alert('Error');
      }
    );
  };

  React.useEffect(() => {
    const flatsSubscription = flatService.flats.subscribe(setFlats);
    getFlats();

    return () => flatsSubscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getFlats}
            tintColor={COLORS.lightBlue}
          />
        }
      >
        {flats.map((flat) => (
          <FlatItem flat={flat} key={flat.id} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
    paddingVertical: 20,
  },
});
