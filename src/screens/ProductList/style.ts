import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const styles = StyleSheet.create({
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
    fontSize: 16,
    color: theme.colors.text.primary,
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
