import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { COLORS } from '../../common/constants';

import { SCREENS } from '../../navigation/MainNavigator';

const Category = ({navigation, route,...props}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.item.title + '!!!',
      headerStyle: {
        backgroundColor: route.params.item.color,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, route]);

  return (
  <View style={styles.container}>
    <Text>Meals category</Text>
    <Button onPress={() => navigation.navigate(SCREENS.MealDetail)} title="Go to Meal Detail" />
  </View>
  )
}

/* Category.navigationOptions = {
  headerTitle: 'Some shit',
  headerStyle: {
    backgroundColor: COLORS.primaryColor,
  }
} */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Category;