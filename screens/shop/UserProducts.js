import React from 'react';

import PageWrapper from 'components/PageWrapper';

import PButton from 'components/PButton';
import ProductList from 'components/ProductList';

import { PRODUCTS } from 'data/dummyData';
import SCREENS from 'navigation/Screens';

const UserProducts = ({ navigation }) => {
  const onEditHandler = (item) => {
    navigation.navigate(SCREENS.ShopEditProduct, { item });
  };

  return (
    <PageWrapper>
      <ProductList
        data={PRODUCTS.filter(({ ownerId }) => ownerId === 'u2')}
        navigation={navigation}
        renderButtons={(item) => [
          <PButton key="edit" onPress={onEditHandler.bind(this, item)}>
            Edit
          </PButton>,
          <PButton icon={'trash'} key="remove" isOutlined></PButton>,
        ]}
      />
    </PageWrapper>
  );
};

export default UserProducts;
