import { PRODUCTS } from 'data/dummyData';
import { showToast } from 'redux/actions/appActions';
import {
  setSectionFetched,
  setSectionFetching,
  setSectionRejected,
} from 'redux/actions/shopActions';

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
        console.log(err);
        if (err !== `CANCELED_REQUEST` && actionRejected) {
          [
            ...(Array.isArray(actionRejected)
              ? actionRejected
              : [actionRejected]),
          ].forEach((action) => dispatch(action(err, section, ...args)));
        }
        if (err.config && err.config.throwError) {
          throw err;
        }
      });
  };

const getUserProductsFn = (userId) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          PRODUCTS.filter(({ ownerId }) => ownerId === userId).reduce(
            (acc, { id, ...rest }) => ({ ...acc, [id]: { ...rest, id } }),
            {},
          ),
        ),
      2000,
    );
  });

const getProductsFn = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        PRODUCTS.reduce(
          (acc, { id, ...rest }) => ({ ...acc, [id]: { ...rest, id } }),
          {},
        ),
      );
    }, 2000);
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
