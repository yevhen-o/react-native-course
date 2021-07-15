import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PageWrapper from 'components/PageWrapper';

import ProductList from 'components/ProductList';
import PText from 'components/PText';

import { getProducts } from 'Api/Api';

const ProductsList = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()(dispatch);
  }, []);

  const productsState = useSelector((state) => state.shop.productsState);

  return (
    <PageWrapper>
      {productsState.isFetching && <PText>Loading...</PText>}
      {productsState.isFetched && (
        <ProductList
          data={Object.values(productsState.data)}
          navigation={navigation}
        />
      )}
    </PageWrapper>
  );
};

export default ProductsList;
