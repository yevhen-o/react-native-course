import React from 'react';
import { View } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';

export const ProgressIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <ProgressCircle size={100} indeterminate={true} />
    </View>
  );
};

export default ProgressIndicator;
