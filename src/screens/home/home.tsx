import * as React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { homeService } from './home.service';
import { FlatItem } from './components/list-item';
import { IFlat } from '../../typings';

export const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [flats, setFlats] = React.useState<IFlat[]>([]);

  const getFlats = async () => {
    try {
      setRefreshing(true);
      const { data } = await homeService.getFlats(1);
      setFlats(data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log(error.response.data);
      Alert.alert('Error');
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFlats();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getFlats} />
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
