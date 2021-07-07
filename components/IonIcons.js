import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from 'common/constants';

const IonIcons = (props) => {
  return (
    <Ionicons
      style={props.style}
      name={props.children || props.name || props.icon}
      size={props.size || 24}
      color={props.color || COLORS.primary}
    />
  );
};

export default IonIcons;
