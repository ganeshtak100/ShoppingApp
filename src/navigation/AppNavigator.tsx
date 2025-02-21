import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from '../screens/CartScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductListScreen from '../screens/ProductListScreen';
import {linking} from './linking';

export type RootStackNavigationProp = {
  navigate: (screen: string, params?: any) => void;
};

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: {productId: number};
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{title: 'Products'}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{title: 'Product Details'}}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{title: 'Shopping Cart'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
