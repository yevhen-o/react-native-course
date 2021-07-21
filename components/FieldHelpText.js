import React from 'react';
import { StyleSheet } from 'react-native';

import { COLORS } from 'common/constants';
import PText from 'components/PText';

const FieldHelpText = ({ children, hasError }) => {
  if (!children) {
    return null;
  }

  const styles = StyleSheet.create({
    text: {
      color: hasError ? COLORS.error : COLORS.disabled,
      fontSize: 13,
      marginTop: 2,
    },
  });

  return <PText style={styles.text}>{children}</PText>;
};

export default FieldHelpText;
