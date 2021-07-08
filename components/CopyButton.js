import React from 'react';
import { Clipboard } from 'react-native';
import PButton from './PButton';

const CopyButton = ({ afterPress, textToCopy, ...restProps }) => {
  const handlePress = () => {
    Clipboard.setString(textToCopy);
    afterPress && typeof afterPress === 'function' && afterPress();
  };

  return <PButton title="Copy" {...restProps} onPress={handlePress} />;
};

export default CopyButton;
