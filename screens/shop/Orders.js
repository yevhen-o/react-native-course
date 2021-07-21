import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import OrderCard from 'components/OrderCard';
import PageWrapper from 'components/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from 'redux/actions/shopActions';
import NothingToDisplay from 'components/NothingToDisplay';
import ProgressIndicator from 'components/ProgressIndicator';

const Orders = () => {
  const dispatch = useDispatch();

  const loadOrders = () => {
    dispatch(getUserOrders());
  };
  useEffect(() => {
    loadOrders();
  }, []);

  const userOrdersState = useSelector((state) => state.shop.userOrdersState);

  if (userOrdersState.isFetching) {
    return <ProgressIndicator />;
  }

  if (userOrdersState.isFetched && !Object.keys(userOrdersState.data).length) {
    return <NothingToDisplay message="Looks you don't have any order yet" />;
  }

  const renderItem = ({ item }) => {
    return <OrderCard key={item.id} order={item} />;
  };

  return (
    <PageWrapper isWithoutScrollView>
      {userOrdersState.isFetching &&
        !Object.keys(userOrdersState.data).length && <ProgressIndicator />}
      {!!Object.keys(userOrdersState.data).length && (
        <FlatList
          onRefresh={loadOrders}
          refreshing={userOrdersState.isFetching}
          data={Object.values(userOrdersState.data)}
          renderItem={renderItem}
          numColumns={1}
          keyExtractor={(item) => item.id}
        />
      )}
    </PageWrapper>
  );
};

export default Orders;
