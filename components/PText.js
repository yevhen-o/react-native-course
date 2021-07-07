import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {COLORS} from 'common/constants';

const PText = ({style, children, isBold, isH1, isH2, isH3, isH4, ...restProps}) => {
  const getStyles = () => {
    const style = {
      fontWeight: 'bold',
      borderBottomWidth: 2,
      borderColor: COLORS.accent,
      marginBottom: 8,
      paddingBottom: 4,
      color: COLORS.primary,
    };
    if (isH1) {
      return {
        fontSize: 22,
        ...style,
      };
    } else if (isH2) {
      return {
        fontSize: 20,
        ...style,
      };
    } else if (isH3) {
      return {
        fontSize: 18,
        ...style,
      };
    } else if (isH4) {
      return {
        fontSize: 18,
        ...style,
        borderBottomWidth: 1,
        fontWeight: 'normal',
      };
    }
    return {
      fontSize: 16,
      fontWeight: isBold ? 'bold' : 'normal',
    };
  };

  const styles = StyleSheet.create({
    bodyText: {
      ...getStyles(),
      fontFamily: 'open-sans',
    },
  });

  return (
    <Text style={{...styles.bodyText, ...style}} {...restProps}>
      {children}
    </Text>
  );
};

export default PText;
