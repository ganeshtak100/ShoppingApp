import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Shimmer from '../../components/Shimmer';
import {useDebounce} from '../../hooks/useDebounce';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {api} from '../../services/api';
import {Product} from '../../types';
import {styles} from './style';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductList'>;
};

const ProductListScreen: React.FC<Props> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  // const [page, setPage] = useState(1);
  const pageNumber = useRef(1);
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const searchTextDebounce = useDebounce(searchQuery, 800);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (!searchTextDebounce) return products;
    return products.filter(product =>
      product?.title
        ?.toLowerCase()
        ?.includes(searchTextDebounce?.toLowerCase()),
    );
  }, [products, searchTextDebounce]);

  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async (refresh = false) => {
    if (isFetching) return;
    if (loading && !refresh) return;
    if (pageNumber.current === 1) {
      setLoading(true);
    } else {
      setFetching(true);
    }
    setError(null);

    try {
      const newProducts = await api.getProducts(
        refresh ? 1 : pageNumber.current,
      );
      // console.log('newProducts--', newProducts);
      if (refresh) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Unable to load products. Please try again.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setFetching(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts(true);
  };

  const renderShimmerLoader = () => (
    <View style={styles.shimmerContainer}>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.shimmerItem}>
          <Shimmer width={80} height={80} style={styles.shimmerImage} />
          <View style={styles.shimmerContent}>
            <Shimmer width={200} height={20} style={styles.shimmerText} />
            <Shimmer width={100} height={15} style={styles.shimmerPrice} />
          </View>
        </View>
      ))}
    </View>
  );
  // Render empty state
  const renderEmptyState = () => {
    if (loading) {
      return renderShimmerLoader();
    }

    if (searchQuery && filteredProducts.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No products found matching "{searchQuery}"
          </Text>
        </View>
      );
    }

    if (!loading && products.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No products available</Text>
        </View>
      );
    }

    return null;
  };
  const loadMoreData = () => {
    console.log('called Loading more data', pageNumber.current);
    if (!loading && !isFetching && searchQuery === '') {
      pageNumber.current = pageNumber.current + 1;
      loadProducts();
    }
  };
  return (
    <View style={styles.container}>
      <Header title="Products" currentScreen="products" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetails', {productId: item.id})
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
        // ListEmptyComponent={() => (loading ? renderShimmerLoader() : null)}
        ListFooterComponent={() =>
          isFetching ? (
            <ActivityIndicator size="large" style={styles.loader} />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          // filteredProducts.length === 0 ? styles.emptyList : undefined
          {
            flexGrow: 1,
          }
        }
      />
    </View>
  );
};

export default ProductListScreen;
