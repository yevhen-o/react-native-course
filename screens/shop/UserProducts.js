import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrapper from 'components/PageWrapper';

import PText from 'components/PText';
import PButton from 'components/PButton';
import ProductList from 'components/ProductList';
import { getUserProducts } from 'redux/actions/shopActions';

import SCREENS from 'navigation/Screens';

const UserProducts = ({ navigation }) => {
  const dispatch = useDispatch();

  const onEditHandler = (item) => {
    navigation.navigate(SCREENS.ShopEditProduct, { item });
  };

  useEffect(() => {
    getUserProducts('u2')(dispatch);
  }, []);

  const userProductsState = useSelector(
    (state) => state.shop.userProductsState,
  );

  return (
    <PageWrapper>
      {userProductsState.isFetching && <PText>Loading...</PText>}
      {userProductsState.isFetched && (
        <ProductList
          data={Object.values(userProductsState.data)}
          navigation={navigation}
          renderButtons={(item) => [
            <PButton key="edit" onPress={onEditHandler.bind(this, item)}>
              Edit
            </PButton>,
            <PButton icon={'trash'} key="remove" isOutlined></PButton>,
          ]}
        />
      )}
    </PageWrapper>
  );
};

export default UserProducts;
