import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PageWrapper from 'components/PageWrapper';

import ProductList from 'components/ProductList';

import { getProducts } from 'redux/actions/shopActions';
import ProgressIndicator from 'components/ProgressIndicator';

const ProductsList = ({ navigation }) => {
  const dispatch = useDispatch();

  const loadProducts = () => {
    dispatch(getProducts());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProducts();
    });

    return unsubscribe;
  }, [loadProducts, navigation]);

  useEffect(() => {
    loadProducts();
  }, []);

  const productsState = useSelector((state) => state.shop.productsState);

  return (
    <PageWrapper isWithoutScrollView>
      {productsState.isFetching && !Object.keys(productsState.data).length && (
        <ProgressIndicator />
      )}
      {!!Object.keys(productsState.data).length && (
        <ProductList
          onRefresh={loadProducts}
          isFetching={productsState.isFetching}
          data={Object.values(productsState.data)}
          navigation={navigation}
        />
      )}
    </PageWrapper>
  );
};

export default ProductsList;
