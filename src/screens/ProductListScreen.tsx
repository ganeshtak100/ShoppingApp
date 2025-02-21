import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import Shimmer from '../components/Shimmer';
import {RootStackParamList} from '../navigation/AppNavigator';
import {api} from '../services/api';
import {Product} from '../types';
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductList'>;
};

const ProductListScreen: React.FC<Props> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout>();

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);
  // Debounced search handler
  const handleSearch = useCallback((text: string) => {
    if (searchDebounce) {
      clearTimeout(searchDebounce);
    }

    setSearchDebounce(
      setTimeout(() => {
        setSearchQuery(text);
      }, 300),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadProducts = async (refresh = false) => {
    if (loading && !refresh) return;
    setLoading(true);
    setError(null);

    try {
      const newProducts = await api.getProducts(refresh ? 1 : page);
      if (refresh) {
        setProducts(newProducts);
        setPage(2);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
        setPage(prev => prev + 1);
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
  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: fadeAnim}}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          //   onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </Animated.View>

      <FlatList
        data={filteredProducts}
        renderItem={({item}) => (
          <Animated.View style={{opacity: fadeAnim}}>
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', {productId: item.id})
              }
            />
          </Animated.View>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadProducts}
        onEndReachedThreshold={0.5}
        // ListEmptyComponent={() => (loading ? renderShimmerLoader() : null)}
        ListFooterComponent={() =>
          loading && products.length > 0 ? (
            <ActivityIndicator size="large" style={styles.loader} />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          filteredProducts.length === 0 ? styles.emptyList : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  shimmerContainer: {
    padding: 10,
  },
  shimmerItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  shimmerImage: {
    borderRadius: 4,
  },
  shimmerContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  shimmerText: {
    marginBottom: 8,
    borderRadius: 4,
  },
  shimmerPrice: {
    borderRadius: 4,
  },
  loader: {
    marginVertical: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyList: {
    flexGrow: 1,
  },
});

export default ProductListScreen;
