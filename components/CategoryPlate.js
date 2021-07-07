import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Card from './Card';
import BodyText from './BodyText';


const CategoryPlate = props => {
  return (
    <Card style={{...styles.category, ...props.style, backgroundColor: props.item.color}}>
      <TouchableOpacity style={styles.link} onPress={props.onSelect.bind(null, props.item)}>
        <BodyText numberOfLines={1} >{props.item.title}</BodyText>
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  category: {
    flex: 1,
    height: 150, 
    margin: 10,
  },
  link: {
    alignItems: 'center', 
    flex: 1, 
    justifyContent: 'space-around',
  }
})

export default CategoryPlate;