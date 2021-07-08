import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from 'common/constants';

import IonIcons from 'components/IonIcons';
import BodyText from 'components/BodyText';
import ErrorText from 'components/ErrorText';
import { toggleMealFavorite } from 'redux/actions/mealsActions';

const MealDetail = ({ navigation, route }) => {
  const item = route.params.item;

  if (!item) {
    return <ErrorText>Please select some Meal2</ErrorText>;
  }

  const dispatch = useDispatch();
  const favorite = useSelector((store) => store.meals.favorite);

  const [isFavorite, setIsFavorite] = useState(favorite.includes(item.id));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.item.title + '!!!',
      headerStyle: {
        backgroundColor: route.params.item.color,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: function addToFavorite(params) {
        return (
          <TouchableOpacity
            onPress={() => {
              setIsFavorite(!isFavorite);
              dispatch(toggleMealFavorite(route.params.item.id));
            }}>
            <IonIcons
              style={{ marginRight: 10 }}
              color={params.tintColor}
              name={isFavorite ? 'star' : 'star-outline'}
            />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, route, isFavorite]);

  const renderList = (list, title) => (
    <View style={styles.list}>
      <BodyText style={styles.title}>{title}</BodyText>
      {list.map((item) => (
        <BodyText key={item} style={styles.listItem}>
          {item}
        </BodyText>
      ))}
    </View>
  );

  const renderSteps = (list, title) => (
    <View style={styles.list}>
      <BodyText style={styles.title}>{title}</BodyText>
      {list.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <BodyText style={{ marginRight: 8, fontWeight: 'bold' }}>
            {index + 1}
          </BodyText>
          <BodyText>{item}</BodyText>
        </View>
      ))}
    </View>
  );

  const { imageUrl, affordability, complexity, duration, ingredients, steps } =
    item;

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.wrapper}>
        <View style={styles.info}>
          <BodyText>
            <BodyText style={{ fontWeight: 'bold' }}>Affordability:</BodyText>{' '}
            {affordability}
          </BodyText>
          <BodyText>
            <BodyText style={{ fontWeight: 'bold' }}>Complexity:</BodyText>{' '}
            {complexity}
          </BodyText>
          <BodyText>
            <BodyText style={{ fontWeight: 'bold' }}>Duration:</BodyText>{' '}
            {duration}
          </BodyText>
        </View>
        {renderList(ingredients, 'Ingredients')}
        {renderSteps(steps, 'Receipt')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  info: {
    marginVertical: 10,
  },
  list: {
    marginBottom: 14,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  title: {
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 4,
  },
  wrapper: {
    paddingHorizontal: 14,
  },
});

export default MealDetail;
