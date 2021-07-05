import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

import { SCREENS } from '../../navigation/MainNavigator';
import { CATEGORIES } from '../../data/dummyData';
import { COLORS } from '../../common/constants';

import BodyText from '../../components/BodyText';

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
    <TouchableOpacity style={styles.category} onPress={categoryChangeHandler.bind(null, data.item)}>
      <View >
        <BodyText>{data.item.title}</BodyText>
      </View>
    </TouchableOpacity>
  )
  return (
    <FlatList numColumns={2} data={CATEGORIES} renderItem={renderItem} />
  )
}

/* Categories.navigationOptions = {
  title: 'Some shit',
  headerStyle: {
    backgroundColor: COLORS.primaryColor,
  }
} */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    flex: 1,
    height: 150, 
    margin: 10,
  }
})

export default Categories;