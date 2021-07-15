import { AT } from 'redux/ActionsTypes';

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
