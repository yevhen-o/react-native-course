import { COLORS } from 'common/constants';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import FieldHelpText from './FieldHelpText';

import FieldLabel from './FieldLabel';

const InputField = ({
  onChange,
  value,
  placeholder,
  label,
  helpText,
  errorText,
  hasError,
  ...restProps
}) => {
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

  const styles = StyleSheet.create({
    container: {
      marginBottom: 14,
      marginTop: 14,
      paddingTop: 12,
      position: 'relative',
    },
    input: {
      borderBottomColor: hasError ? COLORS.error : COLORS.primary,
      borderBottomWidth: 2,
      fontSize: 16,
    },
    isFocused: {
      borderBottomColor: COLORS.accent,
    },
  });

  return (
    <View style={styles.container}>
      <FieldLabel
        isFloating
        hasError={hasError}
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
      {helpText && !hasError && <FieldHelpText>{helpText}</FieldHelpText>}
      {hasError && errorText && (
        <FieldHelpText hasError>{errorText}</FieldHelpText>
      )}
    </View>
  );
};

export default InputField;
