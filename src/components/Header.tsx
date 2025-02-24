import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {Icons} from '../assets/svg';
import {RootState} from '../store';
import {theme} from '../theme';

type IHeaderProps = {
  title?: string;
  currentScreen?: string;
};
// Header Component
function Header({title, currentScreen}: Readonly<IHeaderProps>) {
  const navigation = useNavigation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = useMemo(() => cartItems.length, [cartItems]);
  return (
    <LinearGradient
      colors={[theme.colors.primary, '#357abd']}
      style={styles.header}>
      <View style={styles.headerContent}>
        {currentScreen !== 'products' && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icons.BackIcon />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButton}>
          <Icons.Cart />
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default Header;
const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -5,
    top: -8,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartButton: {
    paddingBottom: 8,
  },
  backButton: {
    paddingBottom: 8,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 8,
  },
});
