import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { SCREENS } from '../../navigation/MainNavigator';

const Filters = props => {
  return (
  <View style={styles.container}>
    <Text>Meals Filters</Text>
    <Button onPress={() => props.navigation.navigate(SCREENS.Meals)} title="Go to Meals" />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Filters;