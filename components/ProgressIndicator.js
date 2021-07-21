import React from 'react';
import { View } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';
import ProgressLine from 'react-native-progress/Bar';
import { COLORS, SPACES } from 'common/constants';

export const ProgressIndicator = ({ isLine }) => {
  const options = {
    color: COLORS.primary,
    indeterminate: true,
    borderWidth: 1,
    borderColor: COLORS.accent,
  };
  return (
    <View
      style={{
        flex: 1,
        ...(!isLine
          ? {
              padding: 50,
              alignItems: 'center',
              justifyContent: 'space-around',
            }
          : {
              marginTop: -SPACES.regular,
            }),
      }}>
      {isLine && <ProgressLine size={100} {...options} width={null} />}
      {!isLine && <ProgressCircle size={100} {...options} />}
    </View>
  );
};

export default ProgressIndicator;
