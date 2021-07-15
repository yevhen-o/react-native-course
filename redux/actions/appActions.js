import { AT } from 'redux/ActionsTypes';

export const showToast = (message) => ({
  type: AT.APP_ADD_TOAST,
  payload: { message },
});

export const clearToast = (message) => ({
  type: AT.APP_CLEAR_TOAST,
  payload: { message },
});
