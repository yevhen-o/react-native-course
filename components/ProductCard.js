import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import PButton from 'components/PButton';
import { COLORS } from 'common/constants';
import { useDispatch } from 'react-redux';
import { addToCart } from 'redux/actions/shopActions';

const ProductCard = ({
  item: { title, imageUrl, price },
  item,
  onSelect,
  renderButtons,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId) => dispatch(addToCart(productId));
  return (
    <Card style={styles.project}>
      <TouchableOpacity style={styles.link} onPress={onSelect}>
        <ImageBackground
          style={styles.image}
          source={{ uri: imageUrl }}></ImageBackground>
        <View style={styles.info}>
          <PText numberOfLines={3} isH2>
            {title}
          </PText>
          <View style={styles.row}>
            <PText>Price:</PText>
            <PText isBold>{price}</PText>
          </View>
          <View style={{ ...styles.row, ...styles.actions }}>
            {renderButtons && typeof renderButtons === 'function'
              ? renderButtons(item)
              : [
                  <PButton key="onselect" onPress={onSelect} isOutlined>
                    View detail
                  </PButton>,
                  <PButton
                    key="onadd"
                    isPrimary
                    onPress={handleAddToCart.bind(this, item.id)}>
                    Add to cart
                  </PButton>,
                ]}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  actions: {
    paddingTop: 15,
  },
  image: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
  },
  info: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  link: {
    flex: 1,
  },
  project: {
    backgroundColor: COLORS.light,
    flex: 1,
    height: 300,
    margin: 10,
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductCard;
