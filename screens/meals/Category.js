import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { MEALS } from 'data/dummyData';
import PlatesList from 'components/PlatesList';
import NothingToDisplay from 'components/NothingToDisplay';

const Category = ({ navigation, route }) => {
  const [categoryMeal, setCategoryMeal] = useState([]);

  const filters = useSelector((state) => state.meals.filters);

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
    setCategoryMeal(
      MEALS.filter((meal) => meal.categoryIds.includes(route.params.item.id)),
    );
  }, [navigation, route]);

  const filterByFilters = (meal) => {
    if (
      (filters.isVegan && !meal.isVegan) ||
      (filters.isVegetarian && !meal.isVegetarian) ||
      (filters.isLactoseFree && !meal.isLactoseFree) ||
      (filters.isGlutenFree && !meal.isGlutenFree)
    ) {
      return false;
    }
    return true;
  };

  const dataToDisplay = categoryMeal.filter(filterByFilters);

  if (!dataToDisplay.length) {
    return (
      <NothingToDisplay isFiltered={Object.values(filters).some((k) => !!k)} />
    );
  }

  return (
    <PlatesList
      data={dataToDisplay}
      color={route.params.item.color}
      navigation={navigation}
    />
  );
};

export default Category;
