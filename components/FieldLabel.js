import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FieldLabel = ({children, isFloated, isFloating}) => {

  if(!children){
    return null
  }

  return (
    <Text style={[styles.text, ...isFloating ? [styles.isFloating] : [], ...isFloated ? [styles.isFloated] : []]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#444',
    fontSize: 16,
  },
  isFloated: {
    color: '#999',
    fontSize: 12,
    top: 0,
  },
  isFloating: {
    position: 'absolute',
    top: 10,
    left: 0,
  }
})

export default FieldLabel;