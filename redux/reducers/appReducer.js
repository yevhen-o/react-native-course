import { AT } from 'redux/ActionsTypes';

const initialState = {
  toasts: [],
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.APP_ADD_TOAST:
      return {
        ...state,
        toasts: state.toasts.includes(payload.message)
          ? [
              ...state.toasts.filter((toast) => toast !== payload.message),
              payload.message,
            ]
          : [...state.favorite, payload.message],
      };
    case AT.APP_CLEAR_TOAST:
      return {
        ...state,
        toasts: [...state.toasts.filter((toast) => toast !== payload.message)],
      };
    default:
      return state;
  }
};
