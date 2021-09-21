import React from 'react';
import { FlatList } from 'react-native';

import PlaceCard from 'components/PlaceCard';
import SCREENS from 'navigation/Screens';

const PlacesFlatList = ({
  navigation,
  data,
  renderButtons,
  onRefresh,
  isFetching,
}) => {
  const renderItem = ({ item }) => {
    return (
      <PlaceCard
        item={item}
        renderButtons={renderButtons}
        onSelect={() => {
          navigation.navigate({
            name: SCREENS.PlaceDetail,
            params: { item: { ...item } },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={isFetching}
      data={data}
      numColumns={1}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlacesFlatList;
