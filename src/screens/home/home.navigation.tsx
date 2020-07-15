import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES, IMAGES } from '../../constants';
import { IFlat, ITenant } from 'src/typings';
import { FlatDetailsScreen } from './flat';
import { BillHistoryCreation, BillCreation, SingleBillHistory } from './bills';
import { EditTenant } from './tenant';
import { AddFlatBtn } from './add-flat/add-flat-btn';
import { AddFlatScreen } from './add-flat/add-flat';
import { FlatsList } from './flats-list/flats-list';
import { Image, TouchableOpacity } from 'react-native';
import { DeleteFlatBtn } from './flat/components/delete-btn';

export type HomeStackParamsList = {
  [ROUTES.FlatsList]: undefined;
  [ROUTES.EditFlat]: (flat: IFlat) => void;
  [ROUTES.FlatDetails]: {
    id: number;
    address: string;
  };
  [ROUTES.AddBillHistory]: {
    flat: number;
    bills: string[];
  };
  [ROUTES.CreateBill]: {
    billsNames: string[];
    bills: string[];
  };
  [ROUTES.EditTenant]: {
    tenant: ITenant | null;
  };
  [ROUTES.SingleBillHistory]: {
    tenant: ITenant | null;
  };
};

const Stack = createStackNavigator<HomeStackParamsList>();

export const HomeNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.FlatsList}>
        <Stack.Screen
          name={ROUTES.FlatsList}
          component={FlatsList}
          options={({ navigation }) => ({
            headerRight: () => (
              <AddFlatBtn
                onPress={() => {
                  navigation.navigate(ROUTES.EditFlat);
                }}
              />
            ),
          })}
        />
        <Stack.Screen name={ROUTES.EditFlat} component={AddFlatScreen} />
        <Stack.Screen
          name={ROUTES.FlatDetails}
          component={FlatDetailsScreen}
          options={({ navigation, route }) => ({
            headerRight: () => <DeleteFlatBtn navigation={navigation} flatId={route.params.id} />,
          })}
        />
        <Stack.Screen
          name={ROUTES.AddBillHistory}
          component={BillHistoryCreation}
        />
        <Stack.Screen name={ROUTES.CreateBill} component={BillCreation} />
        <Stack.Screen name={ROUTES.EditTenant} component={EditTenant} />
        <Stack.Screen
          name={ROUTES.SingleBillHistory}
          component={SingleBillHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
