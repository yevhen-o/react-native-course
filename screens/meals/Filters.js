import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useState } from 'react/cjs/react.development';

import BodyText from 'components/BodyText';
import IonIcons from 'components/IonIcons';

const Filters = ({ navigation, route }) => {

  const [filterValues, setFilterValues] = useState({
    isGlutenFree: false,
    isLactoseFree: false,
    isVegetarian: false,
    isVegan: false,
  });

  const saveButtonHandler = values => {
    console.log(values);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (params) => {
        return (
          <TouchableOpacity
            onPress={() => {
              alert('Will apply save setting someday!');
              saveButtonHandler(filterValues);
            }}
          >
            <IonIcons style={{ marginRight: 10 }} name={'save'} />
          </TouchableOpacity>
        )
      },
    });
  }, [navigation, route, filterValues]);

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