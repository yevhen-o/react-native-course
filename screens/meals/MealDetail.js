import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { SCREENS } from '../../navigation/MainNavigator';

const MealDetail = props => {
  
  return (
  <View style={styles.container}>
    <Text>Meal detail screen</Text>
    <Button onPress={() => props.navigation.navigate(SCREENS.Favorite)} title="Go to Favorite" />
    <Button onPress={() => props.navigation.navigate(SCREENS.Filters)} title="Go to Filters" />
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

export default MealDetail;