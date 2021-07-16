import moment from 'moment';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import CartItem from 'components/CartItem';
import { COLORS } from 'common/constants';

const OrderCard = ({ order }) => {
  const { date, totalAmount, items } = order;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View>
      <Card key={order.id} isWhite>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <PText>{moment(date).format('MMMM Do YYYY, hh:mm')}</PText>
                {!isVisible && <PText isBold>${totalAmount}</PText>}
              </View>
              {isVisible && (
                <View style={{ flex: 1, marginTop: 20 }}>
                  {Object.keys(items).map((key) => (
                    <CartItem
                      isRemoveShown={false}
                      productId={key}
                      item={items[key]}
                      key={key}
                    />
                  ))}
                  <PText
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      borderColor: COLORS.accent,
                      paddingVertical: 4,
                      borderTopWidth: 1,
                    }}>
                    TOTAL: <PText isBold>${totalAmount}</PText>
                  </PText>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OrderCard;
