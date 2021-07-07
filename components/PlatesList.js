import React from 'react';
import {FlatList} from 'react-native';

import MealPlate from 'components/MealPlate';
import {SCREENS} from 'navigation/MainNavigator';

const PlateList = ({navigation, data, color}) => {
  const renderItem = ({item}) => {
    return (
      <MealPlate
        item={item}
        onSelect={() => {
          navigation.navigate({name: SCREENS.MealDetail, params: {item: {...item, color}}});
        }}
      />
    );
  };

  return (
    <FlatList data={data} numColumns={1} renderItem={renderItem} keyExtractor={(item) => item.id} />
  );
};

export default PlateList;
