import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';

import {Icons} from '../../assets/svg';
import Header from '../../components/Header';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {api} from '../../services/api';
import {RootState} from '../../store';
import {addToCart} from '../../store/cartSlice';
import {theme} from '../../theme';
import {Product} from '../../types';
import {createProductDeepLink} from '../../utils/deepLinking';
import {styles} from './style';
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;
  route: RouteProp<RootStackParamList, 'ProductDetails'>;
};

const ProductDetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product?.id);

  const handleShare = async () => {
    if (!product) return;

    try {
      const deepLink = createProductDeepLink(product.id);
      console.log('deepLink', deepLink);
      const shareOptions = {
        title: `Check out ${product.title}!`,
        url: deepLink,
        failOnCancel: false,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await api.getProduct(route.params.productId);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [route.params.productId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 8,
            color: theme.colors.text.primary,
          }}>
          Product not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Products Detail" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Image source={{uri: product.image}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <TouchableOpacity
            style={[styles.button, isInCart && styles.buttonDisabled]}
            onPress={() => {
              if (!isInCart) {
                dispatch(addToCart(product));
              }
            }}
            disabled={isInCart}>
            <Text style={styles.buttonText}>
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Icons.ShareIcon />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;
