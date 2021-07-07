import { COLORS } from 'common/constants';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import FieldLabel from './FieldLabel';

const InputField = ({ onChange, value, placeholder, label, ...restProps }) => {
  const [inputValue, setValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  const onInputChange = (text) => {
    if (onChange && typeof onChange === 'function') {
      onChange(text);
    } else {
      setValue(text);
    }
  };

  const handleFocus = (isFocused) => () => {
    setIsFocused(isFocused);
  };

  return (
    <View style={styles.container}>
      <FieldLabel
        isFloating
        isFloated={isFocused || !!value || !!inputValue || !!placeholder}>
        {label}
      </FieldLabel>
      <TextInput
        {...restProps}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        placeholder={placeholder}
        onChangeText={onInputChange}
        value={value || inputValue}
        style={[styles.input, isFocused ? styles.isFocused : '']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    marginTop: 14,
    paddingTop: 12,
    position: 'relative',
  },
  input: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
  },
  isFocused: {
    borderBottomColor: COLORS.accent,
  },
});

export default InputField;
