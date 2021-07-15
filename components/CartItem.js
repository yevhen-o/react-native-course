import React from 'react';
import { StyleSheet, View } from 'react-native';

import PText from 'components/PText';
import PButton from 'components/PButton';
import { useDispatch } from 'react-redux';
import { removeFromCart } from 'redux/actions/shopActions';

const CartItem = (props) => {
  const { productTitle, quantity, sum, productPrice } = props.item;
  const dispatch = useDispatch();

  const handleRemoveProduct = () => dispatch(removeFromCart(props.productId));
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <PText style={{ flex: 1 }} isBold>
            {productTitle}
          </PText>
        </View>
        <View style={styles.row}>
          <PText>
            {quantity} x ${productPrice}
          </PText>
        </View>
      </View>
      <PText isBold>{sum}</PText>
      <PButton isSecondary icon="trash" onPress={handleRemoveProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CartItem;
