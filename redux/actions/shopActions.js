import { AT } from 'redux/ActionsTypes';
import {
  userLoginFn,
  actionFactory,
  getProductsFn,
  getUserOrdersFn,
  userRenewTokenFn,
  userPlaceOrderFn,
  getUserProductsFn,
  userRemoveProductFn,
  userAddEditProductFn,
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

export const shopPlaceOrder = (section, data, payload) => ({
  type: AT.SHOP_PLACE_ORDER,
  payload: { order: { ...payload, id: data.name } },
});

export const shopRemoveProduct = (section, data, payload) => ({
  type: AT.SHOP_REMOVE_PRODUCT,
  payload,
});

export const shopAddEditProduct = (section, data, payload) => ({
  type: AT.SHOP_ADD_EDIT_PRODUCT,
  payload: { id: data.name, ...payload },
});

export const setUserInfo = (section, data, ...payload) => {
  return {
    type: AT.SHOP_SET_USER_INFO,
    payload: { ...data, ...payload },
    section,
  };
};

export const logOutUser = () => ({
  type: AT.SHOP_USER_LOGOUT,
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

export const userRemoveProduct = actionFactory(
  userRemoveProductFn,
  setSectionFetching,
  [setSectionFetched, shopRemoveProduct],
  setSectionRejected,
  'userRemoveProduct',
);

export const userAddEditProduct = actionFactory(
  userAddEditProductFn,
  setSectionFetching,
  [setSectionFetched, shopAddEditProduct],
  setSectionRejected,
  'userAddEditProductState',
);

export const userLogin = actionFactory(
  userLoginFn,
  setSectionFetching,
  [setSectionFetched, setUserInfo],
  setSectionRejected,
  'userLoginState',
);

export const userRefreshToken = actionFactory(
  userRenewTokenFn,
  setSectionFetching,
  [setSectionFetched, setUserInfo],
  setSectionRejected,
  'userLoginState',
);
