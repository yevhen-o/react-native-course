import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

import { MEALS } from 'data/dummyData';
import { COLORS } from 'common/constants';

import PlatesList from 'components/PlatesList';

const Favorites = ({ navigation, route }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: COLORS.accent,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, route]);

  const favorites = MEALS.filter(m => ['c1', 'c2'].some(c => m.categoryIds.includes(c)))
  return (
    <PlatesList data={favorites} color={COLORS.accent} navigation={navigation} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Favorites;