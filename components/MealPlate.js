import React from 'react';
import { TouchableOpacity, StyleSheet, ImageBackground, View } from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import { COLORS } from 'common/constants';


const MealPlate = ({item: { title, imageUrl, affordability, duration, complexity}, onSelect}) => {
  return (
    <Card style={{...styles.category, backgroundColor: COLORS.light }}>
      <TouchableOpacity style={styles.link} onPress={onSelect}>
        <ImageBackground style={styles.image} source={{uri: imageUrl}}>
          <PText numberOfLines={3} style={styles.title}>{title}</PText>
        </ImageBackground>
        <View style={styles.info}>
          <PText><PText isBold>Affordability: </PText>{affordability}</PText>
          <PText><PText isBold>Complexity: </PText>{complexity}</PText>
          <PText><PText isBold>Duration: </PText>{duration}</PText>
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
    height: '100%', 
    justifyContent: "center",
    resizeMode: "cover",
    width: '100%',
  },
  info: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  link: {
    flex: 1, 
  },
  title: {
    color: COLORS.light,
    fontSize: 22,
    fontWeight: 'bold',
    padding: 14,
    textAlign: 'center',
    textShadowColor: COLORS.primary,
    textShadowRadius: 5,
  }
})

export default MealPlate;