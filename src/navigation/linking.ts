export const linking = {
  prefixes: ['shoppingapp://', 'https://shoppingapp.com'],
  config: {
    screens: {
      ProductList: 'products',
      ProductDetails: {
        path: 'product/:productId',
        parse: {
          productId: (id: string) => Number(id),
        },
      },
      Cart: 'cart',
    },
  },
};
