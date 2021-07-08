import React, { useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useState } from 'react/cjs/react.development';

import PSwitch from 'components/PSwitch';
import IonIcons from 'components/IonIcons';
import { SPACES } from 'common/constants';

const Filters = ({ navigation, route }) => {
  const [filterValues, setFilterValues] = useState({
    isGlutenFree: false,
    isLactoseFree: false,
    isVegetarian: false,
    isVegan: false,
  });

  const saveButtonHandler = (values) => {
    console.log(values);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: function saveSettings() {
        return (
          <TouchableOpacity
            onPress={() => {
              alert('Will apply save setting someday!');
              saveButtonHandler(filterValues);
            }}>
            <IonIcons style={{ marginRight: 10 }} name={'save'} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, route, filterValues]);

  const filters = [
    { label: 'Is GlutenFree', key: 'isGlutenFree' },
    { label: 'Is LactoseFree', key: 'isLactoseFree' },
    { label: 'Is Vegetarian', key: 'isVegetarian' },
    { label: 'Is Vegan', key: 'isVegan' },
  ];

  const handleFilterChange = (key) => (newValue) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {filters.map((row) => (
          <PSwitch
            key={row.key}
            label={row.label}
            value={filterValues[row.key]}
            onValueChange={handleFilterChange(row.key)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACES.regular,
    paddingRight: SPACES.xSmall,
  },
});

export default Filters;
