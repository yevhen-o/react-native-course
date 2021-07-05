import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import MainNavigator from './navigation/MainNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {

  const [isFontLoaded, setIsFontLoaded] = useState(false);
  
  if(!isFontLoaded){
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
  return (
    <MainNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
