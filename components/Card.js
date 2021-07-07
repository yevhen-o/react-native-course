import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from 'common/constants';

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
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.26,
    shadowRadius: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
  }
})

export default Card;