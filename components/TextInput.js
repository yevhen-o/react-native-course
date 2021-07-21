import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import FieldLabel from './FieldLabel';
import { COLORS } from 'common/constants';
import FieldHelpText from './FieldHelpText';
import { checkValidity } from 'common/validationHelper';

const InputField = ({
  label,
  value,
  rules,
  values,
  fieldKey,
  onChange,
  helpText,
  placeholder,
  formErrors = {},
  isTouched: initialTouched,
  ...restProps
}) => {
  const [inputValue, setValue] = useState(value || values[fieldKey] || '');
  const [fieldState, setFieldState] = useState({
    isFocused: false,
    isTouched: restProps.isTouched,
    errorMessage: formErrors[fieldKey],
    isValid: !formErrors[fieldKey],
  });

  useEffect(() => {
    setFieldState((fieldState) => ({
      ...fieldState,
      isTouched: fieldState.isTouched || initialTouched,
      errorMessage: formErrors[fieldKey],
      isValid: !formErrors[fieldKey],
    }));
  }, [initialTouched, formErrors]);

  const { isFocused, isTouched, errorMessage, isValid } = fieldState;

  const onInputChange = (text) => {
    const { isValid, errorMessage } = checkValidity(text, rules[fieldKey]);

    if (onChange && typeof onChange === 'function') {
      onChange(text, {
        formErrors: { ...formErrors, [fieldKey]: errorMessage },
      });
    }
    setFieldState((state) => ({ ...state, isValid, errorMessage }));
    setValue(text);
  };

  const handleFocus = (isFocused) => () => {
    setFieldState((state) => ({ ...state, isFocused }));
    if (!isTouched && !isFocused) {
      setFieldState((state) => ({ ...state, isTouched: true }));
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 14,
      marginTop: 14,
      paddingTop: 12,
      position: 'relative',
    },
    input: {
      borderBottomColor: !isValid && isTouched ? COLORS.error : COLORS.primary,
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
        hasError={!isValid && isTouched}
        isFloated={isFocused || !!value || !!inputValue || !!placeholder}>
        {label}
      </FieldLabel>
      <TextInput
        {...restProps}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        placeholder={placeholder}
        onChangeText={onInputChange}
        value={inputValue.toString()}
        style={[styles.input, isFocused ? styles.isFocused : '']}
      />
      {helpText && isValid && <FieldHelpText>{helpText}</FieldHelpText>}
      {!isValid && errorMessage && isTouched && (
        <FieldHelpText hasError>{errorMessage}</FieldHelpText>
      )}
    </View>
  );
};

export default InputField;
