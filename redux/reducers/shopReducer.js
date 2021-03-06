import { AT } from 'redux/ActionsTypes';
import {
  defaultSectionState,
  handleSectionFetched,
  handleSectionFetching,
  handleSectionRejected,
} from './helpers';

import CartItem from 'models/cartItem';
import Order from 'models/order';

import {
  storageKeys,
  storageRemoveItem,
  storageSet,
} from 'Api/AsyncStorageHelper';

const initialState = {
  productsState: {
    ...defaultSectionState,
  },
  userProductsState: {
    ...defaultSectionState,
  },
  cart: {
    items: {},
    total: 0,
  },
  userOrdersState: {
    ...defaultSectionState,
  },
  userPlaceOrder: {
    ...defaultSectionState,
  },
  userRemoveOrder: {
    ...defaultSectionState,
  },
  userRemoveProduct: {
    ...defaultSectionState,
  },
  userAddEditProductState: {
    ...defaultSectionState,
  },
  userLoginState: {
    ...defaultSectionState,
  },
};

export const shopReducer = (state = initialState, action) => {
  const { type, payload, section } = action;
  switch (type) {
    case AT.SECTION_FETCHING:
      return handleSectionFetching(state, { section, data: payload.data });
    case AT.SECTION_FETCHED:
      return handleSectionFetched(state, { section, data: payload.data });
    case AT.SECTION_REJECTED:
      return handleSectionRejected(state, { section, data: payload.data });
    case AT.SHOP_SET_USER_INFO: {
      const newState = handleSectionFetched(state, {
        section,
        data: payload.data,
      });
      const expireTime =
        new Date().getTime() + parseInt(payload.expires_in || 3600) * 1000;
      newState[section].data.expirationTime = expireTime;
      storageSet(storageKeys.userLoginState, newState.userLoginState);
      return newState;
    }
    case AT.SHOP_USER_LOGOUT:
      storageRemoveItem(storageKeys.userLoginState);
      return {
        ...state,
        userLoginState: {
          ...defaultSectionState,
        },
      };
    case AT.SHOP_ADD_TO_CART: {
      const product = state.productsState.data[payload.productId];
      return {
        ...state,
        cart: {
          ...state.cart,
          items: {
            ...state.cart.items,
            [payload.productId]: new CartItem(
              ((state.cart.items[payload.productId] || {}).quantity || 0) + 1,
              +product.price,
              product.title,
              ((state.cart.items[payload.productId] || {}).sum || 0) +
                +product.price,
            ),
          },
          total: +state.cart.total + +product.price,
        },
      };
    }
    case AT.SHOP_REMOVE_FROM_CART: {
      const product = state.productsState.data[payload.productId];
      const cartItems = { ...state.cart.items };
      if (cartItems[payload.productId].quantity < 2) {
        delete cartItems[payload.productId];
      } else {
        cartItems[payload.productId] = new CartItem(
          ((cartItems[payload.productId] || {}).quantity || 0) - 1,
          +product.price,
          product.title,
          ((cartItems[payload.productId] || {}).sum || 0) - +product.price,
        );
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          items: cartItems,
          total: +state.cart.total - +product.price,
        },
      };
    }
    case AT.SHOP_PLACE_ORDER: {
      return {
        ...state,
        userOrdersState: {
          ...state.userOrdersState,
          data: {
            ...state.userOrdersState.data,
            [payload.order.id]: new Order(
              payload.order.id,
              payload.order.items,
              payload.order.totalAmount,
              payload.order.date,
            ),
          },
        },
        cart: {
          items: {},
          total: 0,
        },
      };
    }
    case AT.SHOP_REMOVE_PRODUCT: {
      const userProductsState = {
        ...state.userProductsState,
        data: { ...state.userProductsState.data },
      };
      const productsState = {
        ...state.productsState,
        data: { ...state.productsState.data },
      };
      const cart = { ...state.cart };
      if (userProductsState.data[payload.productId]) {
        delete userProductsState.data[payload.productId];
      }
      if (productsState.data[payload.productId]) {
        delete productsState.data[payload.productId];
      }
      if (cart.items[payload.productId]) {
        cart.total = +cart.total - +cart.items[payload.productId].sum;
        delete cart.items[payload.productId];
      }
      return {
        ...state,
        cart,
        productsState,
        userProductsState,
      };
    }
    case AT.SHOP_ADD_EDIT_PRODUCT: {
      return {
        ...state,
        userProductsState: {
          ...state.userProductsState,
          data: {
            ...state.userProductsState.data,
            [payload.id]: payload,
          },
        },
        productsState: {
          ...state.productsState,
          data: {
            ...state.productsState.data,
            [payload.id]: payload,
          },
        },
      };
    }
    default:
      return state;
  }
};
