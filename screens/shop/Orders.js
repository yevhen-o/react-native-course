import React, { useEffect } from 'react';
import { View } from 'react-native';

import PText from 'components/PText';
import OrderCard from 'components/OrderCard';
import PageWrapper from 'components/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from 'redux/actions/shopActions';
import NothingToDisplay from 'components/NothingToDisplay';
import ProgressIndicator from 'components/ProgressIndicator';

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUserOrders()(dispatch);
  }, []);

  const userOrdersState = useSelector((state) => state.shop.userOrdersState);

  if (userOrdersState.isFetching) {
    return <ProgressIndicator />;
  }

  if (userOrdersState.isFetched && !Object.keys(userOrdersState.data).length) {
    return <NothingToDisplay message="Looks you don't have any order yet" />;
  }

  return (
    <PageWrapper>
      {userOrdersState.isFetching && <PText>Loading ...</PText>}
      {userOrdersState.isFetched && (
        <View style={{ flex: 1 }}>
          {Object.values(userOrdersState.data).map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      )}
    </PageWrapper>
  );
};

export default Orders;
