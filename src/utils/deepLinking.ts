import {Linking, Platform} from 'react-native';

export const createProductDeepLink = (productId: number): string => {
  if (Platform.OS === 'ios') {
    return `shoppingapp://app/product/${productId}`;
  }
  return `shoppingapp://app/product/${productId}`;
};

export const createWebLink = (productId: number): string => {
  return `https://shoppingapp.com/product/${productId}`;
};

export const openProductDetails = async (productId: number): Promise<void> => {
  try {
    const url = createProductDeepLink(productId);
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      const webUrl = createWebLink(productId);
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    console.error('Error opening URL:', error);
  }
};
