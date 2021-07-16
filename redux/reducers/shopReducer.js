import { AT } from 'redux/ActionsTypes';
import {
  defaultSectionState,
  handleSectionFetched,
  handleSectionFetching,
  handleSectionRejected,
} from './helpers';

import CartItem from 'models/cartItem';
import Order from 'models/order';

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
              product.price,
              product.title,
              ((state.cart.items[payload.productId] || {}).sum || 0) +
                product.price,
            ),
          },
          total: state.cart.total + product.price,
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
          product.price,
          product.title,
          ((cartItems[payload.productId] || {}).sum || 0) - product.price,
        );
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          items: cartItems,
          total: state.cart.total - product.price,
        },
      };
    }
    case AT.SHOP_PLACE_ORDER: {
      console.log('payload', payload.order);
      return {
        ...state,
        userOrdersState: {
          ...state.userOrdersState,
          data: {
            ...state.userOrdersState.data,
            [payload.order.id]: new Order(
              payload.order.id,
              payload.order.items,
              payload.order.total,
              Date.now(),
            ),
          },
        },
        cart: {
          items: {},
          total: 0,
        },
      };
    }
    default:
      return state;
  }
};
