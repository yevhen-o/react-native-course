import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import BodyText from '../../components/BodyText';
import { SCREENS } from '../../navigation/MainNavigator';

const Meals = (props) => {

  return (
    <View style={styles.container}>
     <BodyText>Meals app</BodyText>
     <Button onPress={() => props.navigation.navigate(SCREENS.Categories)} title="Go to categories" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Meals;
