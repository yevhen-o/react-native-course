import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrapper from 'components/PageWrapper';

import PButton from 'components/PButton';
import ProductList from 'components/ProductList';
import NothingToDisplay from 'components/NothingToDisplay';
import { getUserProducts, userRemoveProduct } from 'redux/actions/shopActions';

import SCREENS from 'navigation/Screens';
import ProgressIndicator from 'components/ProgressIndicator';

const UserProducts = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const onEditHandler = (item) => {
    navigation.navigate(SCREENS.ShopEditProduct, { item });
  };

  useEffect(() => {
    getUserProducts('u2')(dispatch);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: function addButton() {
        return (
          <PButton
            isSecondary
            icon="add-circle"
            onPress={() =>
              navigation.navigate(SCREENS.ShopEditProduct)
            }></PButton>
        );
      },
    });
  }, [navigation, route]);

  const userProductsState = useSelector(
    (state) => state.shop.userProductsState,
  );

  const { isFetching: isRemoveProgress } = useSelector(
    (state) => state.shop.userRemoveProduct,
  );

  const handleRemoveProduct = (item) => {
    userRemoveProduct({ productId: item.id })(dispatch);
  };

  if (isRemoveProgress || userProductsState.isFetching) {
    return <ProgressIndicator />;
  }

  if (!Object.values(userProductsState.data).length) {
    return (
      <NothingToDisplay
        message="Please add some projects first"
        title="No products yet"
      />
    );
  }

  return (
    <PageWrapper>
      {userProductsState.isFetched && (
        <ProductList
          data={Object.values(userProductsState.data)}
          navigation={navigation}
          renderButtons={(item) => [
            <PButton key="edit" onPress={onEditHandler.bind(this, item)}>
              Edit
            </PButton>,
            <PButton
              onPress={handleRemoveProduct.bind(this, item)}
              icon={'trash'}
              key="remove"
              isOutlined></PButton>,
          ]}
        />
      )}
    </PageWrapper>
  );
};

export default UserProducts;
