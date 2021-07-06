import React from 'react';
import { StyleSheet, Text } from 'react-native';


const BodyText = ({style, children, ...restProps}) => (
  <Text style={{...styles.bodyText, ...style}} { ...restProps }>{children}</Text>
)

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans',
    fontSize: 16,
  }
})

export default BodyText;