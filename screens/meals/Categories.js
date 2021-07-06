import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { CATEGORIES } from 'data/dummyData';
import { SCREENS } from 'navigation/MainNavigator';
import CategoryPlate from 'components/CategoryPlate';

const Categories = props => {

  const categoryChangeHandler = item => {
    props.navigation.navigate({
      name: SCREENS.Category,
      params: {
        item,
      }
    })
  }

  const renderItem = data => (
    <CategoryPlate onSelect={categoryChangeHandler.bind(null, data.item)} item={data.item} />
  )
  return (
    <FlatList numColumns={2} data={CATEGORIES} renderItem={renderItem} />
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
})

export default Categories;