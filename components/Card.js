import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {

  return (
    <View style={{...styles.card, ...props.style}}>
      <View style={{...styles.content}}>
        {props.children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
  }
})

export default Card;