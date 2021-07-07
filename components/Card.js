import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACES } from 'common/constants';

const Card = (props) => {
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
      ...(props.isWhite
        ? {
            backgroundColor: COLORS.light,
            padding: SPACES.regular,
            marginBottom: SPACES.normal,
          }
        : {}),
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      flexGrow: 1,
    },
  });

  return (
    <View style={{ ...styles.card, ...props.style }}>
      <View style={{ ...styles.content }}>{props.children}</View>
    </View>
  );
};

export default Card;
