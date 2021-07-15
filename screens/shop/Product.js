import React, { useLayoutEffect } from 'react';

import { View, Image, StyleSheet } from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import PButton from 'components/PButton';
import PageWrapper from 'components/PageWrapper';
import { useDispatch } from 'react-redux';
import { addToCart } from 'redux/actions/shopActions';

const Product = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.item.title + '!',
    });
  }, [navigation, route]);

  const { imageUrl, price, description, id } = route.params.item;

  const dispatch = useDispatch();

  const handleAddToCart = () => dispatch(addToCart(id));

  return (
    <PageWrapper>
      <View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.row}>
        <PText>Price:</PText>
        <PText isBold>{price}</PText>
      </View>
      <PButton isFullWidth onPress={handleAddToCart}>
        Add To Cart
      </PButton>

      <PText style={styles.description} isH4>
        Description
      </PText>
      <Card isWhite>
        <PText>{description}</PText>
      </Card>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: 30,
  },
  image: {
    height: 300,
    marginBottom: 20,
    width: '100%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Product;
