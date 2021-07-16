import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import PText from 'components/PText';

const ErrorText = ({ message, children, isFiltered, image, title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image ? { uri: image } : require('assets/noData.png')}
      />
      {title && <PText isH3>{title}</PText>}
      <PText>
        {message ||
          children ||
          (isFiltered
            ? 'No data match your criteria'
            : 'Nothing to display, try add data first')}
      </PText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: undefined,
    height: 'auto',
    justifyContent: 'flex-start',
    margin: 20,
    padding: 20,
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default ErrorText;
