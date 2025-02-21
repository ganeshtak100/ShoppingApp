import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../navigation/AppNavigator';
import {api} from '../services/api';
import {RootState} from '../store';
import {addToCart} from '../store/cartSlice';
import {Product} from '../types';
import {createProductDeepLink} from '../utils/deepLinking';
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
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare} style={{marginRight: 15}}>
          <Icon name="share-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, product]);

  const handleShare = async () => {
    if (!product) return;

    try {
      const deepLink = createProductDeepLink(product.id);
      await Share.share({
        message: `Check out ${product.name}!`,
        url: deepLink,
      });
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
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity
          style={[styles.button, isInCart && styles.buttonDisabled]}
          onPress={() => !isInCart && dispatch(addToCart(product))}
          disabled={isInCart}>
          <Text style={styles.buttonText}>
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  details: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;
