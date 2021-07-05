import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';


const BodyText = props => (
  <Text style={{...styles.bodyText, ...props.style}}>{props.children}</Text>
)

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  }
})

export default BodyText;