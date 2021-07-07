import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
    backgroundColor: 'rgba(86, 252, 3, 0.5)',
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: -8,
    marginRight: -8,
    padding: 8,
  },
});

export default Head;
