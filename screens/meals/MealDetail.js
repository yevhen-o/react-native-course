import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native';

import { COLORS } from 'common/constants';

import IonIcons from 'components/IonIcons';
import BodyText from 'components/BodyText';
import ErrorText from 'components/ErrorText';
import { useState } from 'react/cjs/react.development';

const MealDetail = ({navigation, route, ...props}) => {

  const item = route.params.item;

  if(!item){
    return <ErrorText>Please select some Meal2</ErrorText>
  }

  const [isFavorited, setIsFavorited] = useState(false)

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
      headerRight: (params) => {
        return (
          <TouchableOpacity
          onPress={() => {
            alert('Will add to favorite soon');
            setIsFavorited(!isFavorited);
          }}
        >
          <IonIcons style={{ marginRight: 10 }} color={params.tintColor} name={isFavorited ? 'star' : 'star-outline'} />
        </TouchableOpacity>
        )
      },
    });
  }, [navigation, route, isFavorited]);
  
  const renderList = (list, title) => (
    <View style={styles.list}>
      <BodyText style={styles.title}>{title}</BodyText>
      {list.map(item => <BodyText style={styles.listItem}>{item}</BodyText>)}
    </View>
  )
  
  const renderSteps = (list, title) => (
    <View style={styles.list}>
      <BodyText style={styles.title}>{title}</BodyText>
      {list.map((item, index) => (
        <View style={styles.listItem}>
          <BodyText style={{marginRight: 8, fontWeight: 'bold'}}>{index + 1}</BodyText>
          <BodyText>{item}</BodyText>
        </View>
      ))}

    </View>
  )

  const { imageUrl, affordability, complexity, duration, ingredients, steps } = item;
  
  return (
  <ScrollView>
    <Image style={styles.image} source={{uri: imageUrl}} />
    <View style={styles.wrapper}>
      <View style={styles.info}>
        <BodyText><BodyText style={{fontWeight: 'bold'}}>Affordability:</BodyText> {affordability}</BodyText>
        <BodyText><BodyText style={{fontWeight: 'bold'}}>Complexity:</BodyText> {complexity}</BodyText>
        <BodyText><BodyText style={{fontWeight: 'bold'}}>Duration:</BodyText> {duration}</BodyText>
      </View>
      {renderList(ingredients, 'Ingredients')}
      {renderSteps(steps, 'Receipt')}
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
  },
  image: {
    width: '100%',
    height: 300,
  },
  info: {
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: COLORS.accentColor,
    marginBottom: 8,
    paddingBottom: 4,
  },
  list: {
    marginBottom: 14,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  }
})

export default MealDetail;