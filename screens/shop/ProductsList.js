import React from 'react';

import PageWrapper from 'components/PageWrapper';

import ProductList from 'components/ProductList';

import { PRODUCTS } from 'data/dummyData';

const ProductsList = ({ navigation }) => {
  return (
    <PageWrapper>
      <ProductList data={PRODUCTS} navigation={navigation} />
    </PageWrapper>
  );
};

export default ProductsList;
