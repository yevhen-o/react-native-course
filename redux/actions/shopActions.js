import { AT } from 'redux/ActionsTypes';
import {
  actionFactory,
  getProductsFn,
  getUserProductsFn,
  getUserOrdersFn,
  userPlaceOrderFn,
} from 'Api/Api';

export const setSectionFetching = (section, ...args) => ({
  type: AT.SECTION_FETCHING,
  payload: { ...args },
  section,
});

export const setSectionFetched = (section, data, ...args) => ({
  type: AT.SECTION_FETCHED,
  payload: { data, ...args },
  section,
});

export const setSectionRejected = (section, ...args) => ({
  type: AT.SECTION_REJECTED,
  payload: { ...args },
  section,
});

export const addToCart = (productId) => ({
  type: AT.SHOP_ADD_TO_CART,
  payload: { productId },
});

export const removeFromCart = (productId) => ({
  type: AT.SHOP_REMOVE_FROM_CART,
  payload: { productId },
});

export const shopPlaceOrder = (section, data) => ({
  type: AT.SHOP_PLACE_ORDER,
  payload: { order: data },
});

export const getProducts = actionFactory(
  getProductsFn,
  setSectionFetching,
  setSectionFetched,
  setSectionRejected,
  'productsState',
);

export const getUserProducts = actionFactory(
  getUserProductsFn,
  setSectionFetching,
  setSectionFetched,
  setSectionRejected,
  'userProductsState',
);

export const getUserOrders = actionFactory(
  getUserOrdersFn,
  setSectionFetching,
  setSectionFetched,
  setSectionRejected,
  'userOrdersState',
);

export const userPlaceOrder = actionFactory(
  userPlaceOrderFn,
  setSectionFetching,
  [setSectionFetched, shopPlaceOrder],
  setSectionRejected,
  'userPlaceOrder',
);
