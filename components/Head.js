import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Head = () => {
  return (
    <View style={styles.head}>
      <Text>My firs React Native app</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: "rgba(86, 252, 3, 0.5)",
    marginLeft: -8,
    marginRight: -8,
    marginBottom: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Head;