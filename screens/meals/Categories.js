import React from 'react';
import { FlatList } from 'react-native';

import { CATEGORIES } from 'data/dummyData';
import SCREENS from 'navigation/Screens';
import CategoryPlate from 'components/CategoryPlate';

const Categories = (props) => {
  const categoryChangeHandler = (item) => {
    props.navigation.navigate({
      name: SCREENS.Category,
      params: {
        item,
      },
    });
  };

  const renderItem = (data) => (
    <CategoryPlate
      onSelect={categoryChangeHandler.bind(null, data.item)}
      item={data.item}
    />
  );

  return <FlatList numColumns={2} data={CATEGORIES} renderItem={renderItem} />;
};

export default Categories;
