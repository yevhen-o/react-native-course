import { httpClient } from 'Api/Api';
import { userRefreshToken, logOutUser } from 'redux/actions/shopActions';

let isRenewTokenInProcess = false;
let renewIteration = 0;

const interceptorRequestFunction = async (store, config) => {
  return new Promise((resolve) => {
    const state = store.getState();
    const { idToken, expirationTime, refreshToken } =
      state.shop.userLoginState.data;
    if (isRenewTokenInProcess || (!expirationTime && renewIteration < 5)) {
      renewIteration++;
      setTimeout(() => {
        console.log('iteration ', renewIteration);
        resolve(interceptorRequestFunction(store, config));
      }, 1000);
    } else {
      console.log(
        'is token expired',
        !expirationTime || new Date().getTime() >= expirationTime,
      );
      if (!expirationTime || new Date().getTime() >= expirationTime) {
        isRenewTokenInProcess = true;
        renewIteration = 0;
        console.log('on renew token');
        console.log(expirationTime);
        console.log(new Date().getTime());
        store
          .dispatch(userRefreshToken({ refreshToken }))
          .then(() => {
            isRenewTokenInProcess = false;
            resolve(interceptorRequestFunction(store, config));
          })
          .catch((e) => {
            isRenewTokenInProcess = false;
            console.log('on catch', e);
          });
      } else {
        console.log('resolve');
        config.url = `${config.url}?auth=${idToken}`;
        resolve(config);
      }
    }
  });
};

const interceptor = (store) => {
  httpClient.interceptors.request.use(
    async (config) => {
      const conf = await interceptorRequestFunction(store, config);
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  httpClient.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      if (+error.response.status === 401) {
        store.dispatch(logOutUser());
      }

      // You can handle error here and trigger warning message without get in the code inside
      return Promise.reject(error);
    },
  );
};
export default {
  interceptor,
};
