import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import PButton from 'components/PButton';
import CartItem from 'components/CartItem';
import PageWrapper from 'components/PageWrapper';
import NothingToDisplay from 'components/NothingToDisplay';
import { userPlaceOrder } from 'redux/actions/shopActions';
import { ProgressIndicator } from 'components/ProgressIndicator';

const Cart = () => {
  const dispatch = useDispatch();
  const { total, items } = useSelector((state) => state.shop.cart);
  const { isFetching: isOrderPlacing } = useSelector(
    (state) => state.shop.userPlaceOrder,
  );

  const handlePlaceOrder = () => {
    userPlaceOrder({ total, items })(dispatch);
  };
  if (!Object.keys(items).length) {
    return <NothingToDisplay message="Your cart is empty" />;
  }
  if (isOrderPlacing) {
    return <ProgressIndicator />;
  }
  return (
    <PageWrapper>
      <ScrollView>
        <Card isWhite style={styles.card}>
          <View style={styles.wrap}>
            <View style={styles.row}>
              <PText isBold>Total: </PText>
              <PText isBold>${total.toFixed(2)}</PText>
            </View>
            <View>
              <PButton onPress={handlePlaceOrder} isFullWidth>
                Place order
              </PButton>
            </View>
          </View>
        </Card>
        {Object.keys(items).map((key) => (
          <CartItem productId={key} item={items[key]} key={key} />
        ))}
      </ScrollView>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  wrap: {
    flex: 1,
  },
});

export default Cart;
