import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { useState } from 'react/cjs/react.development';

import BodyText from 'components/BodyText';

const Filters = props => {

  const [filterValues, setFilterValues] = useState({
    isGlutenFree: false,
    isLactoseFree: false,
    isVegetarian: false,
    isVegan: false,
  });

  const filters = [
    { label: 'Is GlutenFree', key: 'isGlutenFree'},
    { label: 'Is LactoseFree', key: 'isLactoseFree'},
    { label: 'Is Vegetarian', key: 'isVegetarian'},
    { label: 'Is Vegan', key: 'isVegan'},
  ];

  const handleFilterChange = key => newValue => {
    setFilterValues(prevValues => ({
      ...prevValues,
      [key]: newValue,
    }))
  }

  return (
  <ScrollView >
    {filters.map( row => (
      <View style={styles.row} key={row.key}>
        <BodyText style={styles.label}>{row.label}</BodyText>
        <Switch value={filterValues[row.key]} onValueChange={handleFilterChange(row.key)} />
      </View>
    ))}
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flex: 1, 
    padding: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  label: {
    fontWeight: 'bold',
  }
})

export default Filters;