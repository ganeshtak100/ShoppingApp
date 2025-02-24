import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/Header';
import {RootState} from '../../store';
import {removeFromCart, updateQuantity} from '../../store/cartSlice';
import {styles} from './styles';

const CartScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({id, quantity}));
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Cart" />
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <Image source={{uri: item.image}} style={styles.cartItemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(removeFromCart(item.id))}
              style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
