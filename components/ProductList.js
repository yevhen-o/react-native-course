import React from 'react';
import { FlatList } from 'react-native';

import ProductCard from 'components/ProductCard';
import SCREENS from 'navigation/Screens';

const ProductList = ({
  navigation,
  data,
  renderButtons,
  onRefresh,
  isFetching,
}) => {
  const renderItem = ({ item }) => {
    return (
      <ProductCard
        item={item}
        renderButtons={renderButtons}
        onSelect={() => {
          navigation.navigate({
            name: SCREENS.ShopProduct,
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

export default ProductList;
