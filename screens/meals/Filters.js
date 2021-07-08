import React, { useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { useSelector, useDispatch } from 'react-redux';

import PSwitch from 'components/PSwitch';
import IonIcons from 'components/IonIcons';
import { SPACES } from 'common/constants';
import { mealsUpdateFilters } from 'redux/actions/mealsActions';

const Filters = ({ navigation, route }) => {
  const actualFilters = useSelector((state) => state.meals.filters);
  const [filterValues, setFilterValues] = useState(actualFilters);

  const dispatch = useDispatch();

  const saveButtonHandler = (values) => {
    dispatch(mealsUpdateFilters(values));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: function saveSettings() {
        return (
          <TouchableOpacity
            onPress={() => {
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
