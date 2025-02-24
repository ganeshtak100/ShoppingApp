import {Platform} from 'react-native';

export const createProductDeepLink = (productId: number): string => {
  if (Platform.OS === 'ios') {
    return `shoppingapp://app/product/${productId}`;
  }
  return `shoppingapp://app/product/${productId}`;
};
