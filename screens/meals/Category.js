import React, { useLayoutEffect, useState } from 'react';

import { MEALS } from 'data/dummyData';
import PlatesList from 'components/PlatesList';

const Category = ({ navigation, route }) => {
  const [categoryMeal, setCategoryMeal] = useState([]);

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

  return (
    <PlatesList
      data={categoryMeal}
      color={route.params.item.color}
      navigation={navigation}
    />
  );
};

export default Category;
