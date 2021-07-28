import axios from 'axios';
import { showToast } from 'redux/actions/appActions';
import { getUserId } from './helper';

export const httpClient = axios.create({
  baseURL: 'https://react-native-course-99e2c-default-rtdb.firebaseio.com/',
});

const authClient = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
});

// Add a request interceptor
authClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.url = `${config.url}?key=AIzaSyAFBvmLQamjFivB1rW2zVbByDuXX50WiTg`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const STATUS = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
  MAINTENANCE: 503,
  BED_REQUEST: 400,
};

export const fetchingFactory = async (fetchingFunction, options) => {
  const {
    dispatch,
    errorMessage,
    successMessage,
    deriveMessageFromResponse,
    deriveErrorFromResponse,
    additionalDataRequest,
  } = options;
  try {
    const res = await fetchingFunction();

    if (res.data && res.data.acl_error) {
      return Promise.reject(res);
    }
    if (res.data && res.data.type === STATUS.FORBIDDEN && res.data.acl_error) {
      return Promise.reject(res);
    }

    if (deriveMessageFromResponse && deriveMessageFromResponse(res)) {
      dispatch(showToast(deriveMessageFromResponse(res)));
    } else if (successMessage) {
      dispatch(showToast(successMessage));
    }
    return res;
  } catch (err) {
    if (!additionalDataRequest) {
      if (deriveErrorFromResponse) {
        deriveErrorFromResponse(err) !== '' &&
          dispatch(showToast(deriveErrorFromResponse(err)));
      } else {
        const message = errorMessage;
        !!message && dispatch(showToast(message));
      }
    }
  }
};

export const actionFactory =
  (apiFunc, actionFetching, actionFulfilled, actionRejected, section) =>
  (...args) =>
  (dispatch) => {
    [
      ...(Array.isArray(actionFetching) ? actionFetching : [actionFetching]),
    ].forEach((action) => dispatch(action(section, ...args)));
    return apiFunc(...args)
      .then((data) => {
        [
          ...(Array.isArray(actionFulfilled)
            ? actionFulfilled
            : [actionFulfilled]),
        ].forEach((action) => dispatch(action(section, data, ...args)));
        return data;
      })
      .catch((err) => {
        console.log('err -----> ', err);
        if (actionRejected) {
          [
            ...(Array.isArray(actionRejected)
              ? actionRejected
              : [actionRejected]),
          ].forEach((action) => dispatch(action(section, err, ...args)));
          throw err;
        }
      });
  };

export const retrieveData = (response) => response.data;

export const moveObjectKeyIntoIdField = (object) =>
  Object.keys(object || {}).reduce(
    (acc, key) => ({ ...acc, [key]: { ...object[key], id: key } }),
    {},
  );

export const getUserProductsFn = () =>
  httpClient
    .get('products.json')
    .then(retrieveData)
    .then(moveObjectKeyIntoIdField);

export const getProductsFn = () =>
  httpClient
    .get('products.json')
    .then(retrieveData)
    .then(moveObjectKeyIntoIdField);

export const getUserOrdersFn = () =>
  httpClient
    .get(`orders/${getUserId()}.json`)
    .then(retrieveData)
    .then(moveObjectKeyIntoIdField);

export const userPlaceOrderFn = (order) =>
  httpClient.post(`/orders/${getUserId()}.json`, order).then(retrieveData);

export const userRemoveProductFn = ({ productId }) =>
  httpClient.delete(`/products/${productId}.json`);

export const userAddEditProductFn = (product) => {
  if (!product.id) {
    return httpClient.post('/products.json', product).then(retrieveData);
  }
  return httpClient.patch(`/products/${product.id}.json`, product);
};

export const userLoginFn = ({ login, pass, isLogin }) =>
  authClient
    .post(isLogin ? 'accounts:signInWithPassword' : 'accounts:signUp', {
      email: login,
      password: pass,
      returnSecureToken: true,
    })
    .then(retrieveData);

export const userRenewTokenFn = ({ refreshToken }) =>
  authClient({
    method: 'post',
    url: 'https://securetoken.googleapis.com/v1/token',
    data: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
  }).then((response) => ({
    ...response.data,
    tokenId: response.data.id_token,
    expires_in: response.data.expires_in,
    refreshToken: response.data.refresh_token,
  }));
