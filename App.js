import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MainNavigator from 'navigation/MainNavigator';
import { mealsReducer } from 'redux/reducers/mealsReducer';

const store = createStore(
  combineReducers({
    meals: mealsReducer,
  }),
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
