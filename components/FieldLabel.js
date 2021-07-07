import { COLORS } from 'common/constants';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const FieldLabel = ({ children, isFloated, isFloating }) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      style={[
        styles.text,
        ...(isFloating ? [styles.isFloating] : []),
        ...(isFloated ? [styles.isFloated] : []),
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  isFloated: {
    color: COLORS.primary,
    fontSize: 12,
    top: 0,
  },
  isFloating: {
    left: 0,
    position: 'absolute',
    top: 10,
  },
  text: {
    color: COLORS.primary,
    fontSize: 16,
  },
});

export default FieldLabel;
