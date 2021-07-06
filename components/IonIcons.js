import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IonIcons = props => {
  return (
    <Ionicons name={props.children || props.name || props.icon} size={props.size || 24} color={props.color || 'black'} />
  )
}

export default IonIcons;