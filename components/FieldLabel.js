import { COLORS } from 'common/constants';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const FieldLabel = ({ children, isFloated, isFloating, hasError }) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      style={[
        styles.text,
        ...(isFloating ? [styles.isFloating] : []),
        ...(isFloated ? [styles.isFloated] : []),
        ...(hasError ? [styles.hasError] : []),
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  hasError: {
    color: COLORS.error,
  },
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
