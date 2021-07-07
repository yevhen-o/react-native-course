import { COLORS } from 'common/constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Head = () => {
  return (
    <View style={styles.head}>
      <Text>My firs React Native app</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: -8,
    marginRight: -8,
    padding: 8,
  },
});

export default Head;
