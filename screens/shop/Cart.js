import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import PButton from 'components/PButton';
import PageWrapper from 'components/PageWrapper';
import CartItem from 'components/CartItem';

const Cart = () => {
  const { total, items } = useSelector((state) => state.shop.cart);
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
              <PButton isFullWidth>Place order</PButton>
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
