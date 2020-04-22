import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../constants';
import { Home } from './home';
import { AddFlatBtn } from './components/add-flat/add-flat-btn';
import { AddFlatScreen } from './components/add-flat/add-flat';
import { IFlat, ITenant } from 'src/typings';
import { FlatDetailsScreen } from '../flat';
import { BillHistoryCreation, BillCreation, SingleBillHistory } from '../bills';
import { EditTenant } from '../tenant';

export type HomeStackParamsList = {
  [ROUTES.Home]: undefined;
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
      <Stack.Navigator initialRouteName={ROUTES.Home}>
        <Stack.Screen
          name={ROUTES.Home}
          component={Home}
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
        <Stack.Screen name={ROUTES.FlatDetails} component={FlatDetailsScreen} />
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
