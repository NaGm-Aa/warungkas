import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from '../screens/ProfileScreen';
import ManagePriceScreen from '../screens/ManagePriceScreen';
import CashierScreen from '../screens/CashierScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ route }) {
  const { shopName } = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cashier" component={CashierScreen} initialParams={{ shopName }} options={{ title: 'Kasir' }} />
      <Tab.Screen name="History" component={HistoryScreen} initialParams={{ shopName }} options={{ title: 'Riwayat' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Pilih Profil' }} />
        <Stack.Screen name="ManagePrice" component={ManagePriceScreen} options={{ title: 'Kelola Harga' }} />
        <Stack.Screen name="MainApp" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}