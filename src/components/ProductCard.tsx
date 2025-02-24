import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../theme';
import {Product} from '../types';

type Props = {
  product: Product;
  onPress: () => void;
};

const ProductCard: React.FC<Props> = ({product, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product?.title ?? ''}</Text>
        <Text style={styles.price}>${product?.price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    color: theme.colors.text.primary,
    opacity: 0.8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ProductCard;
