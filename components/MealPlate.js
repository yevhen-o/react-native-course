import React from 'react';
import { TouchableOpacity, StyleSheet, ImageBackground, View } from 'react-native';

import Card from 'components/Card';
import BodyText from 'components/BodyText';
import { COLORS } from 'common/constants';


const MealPlate = ({item: { title, imageUrl, affordability, duration, complexity}, item, onSelect}) => {
  return (
    <Card style={{...styles.category, backgroundColor: COLORS.light }}>
      <TouchableOpacity style={styles.link} onPress={onSelect}>
        <ImageBackground style={styles.image} source={{uri: item.imageUrl}}>
          <BodyText numberOfLines={3} style={styles.title}>{item.title}</BodyText>
        </ImageBackground>
        <View style={styles.info}>
          <BodyText><BodyText style={{fontWeight: 'bold'}}>Affordability:</BodyText> {affordability}</BodyText>
          <BodyText><BodyText style={{fontWeight: 'bold'}}>Complexity:</BodyText> {complexity}</BodyText>
          <BodyText><BodyText style={{fontWeight: 'bold'}}>Duration:</BodyText> {duration}</BodyText>
        </View>
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  category: {
    flex: 1,
    height: 200, 
    margin: 10,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%', 
    height: '100%',
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    color: COLORS.light,
    textAlign: 'center',
    textShadowColor: COLORS.primary,
    textShadowRadius: 5,
    padding: 14,
    fontWeight: 'bold',
  },
  info: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  link: {
    flex: 1, 
  }
})

export default MealPlate;