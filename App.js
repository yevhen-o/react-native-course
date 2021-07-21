import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

import MainNavigator from 'navigation/MainNavigator';
import { mealsReducer } from 'redux/reducers/mealsReducer';
import { appReducer } from 'redux/reducers/appReducer';
import { shopReducer } from 'redux/reducers/shopReducer';

const store = createStore(
  combineReducers({
    meals: mealsReducer,
    app: appReducer,
    shop: shopReducer,
  }),
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('assets/Fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  console.info('Ready id:', Math.random().toString().replace('0.', ''));
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
