import { COLORS } from 'common/constants';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import FieldLabel from './FieldLabel';

const InputField = props => {

  const [inputValue, setValue] = useState(props.value || '')
  const [isFocused, setIsFocused] = useState(false)

  const onInputChange = text => {
    if(props.onChange && typeof props.onChange === 'function'){
      props.onChange(text)
    } else {
      setValue(text)
    }
  }

  const handleFocus = isFocused => () => {
    setIsFocused(isFocused)
  }

  return (
    <View style={styles.container}>
      <FieldLabel isFloating isFloated={isFocused || !!inputValue || !!props.placeholder}>{props.label}</FieldLabel>
      <TextInput 
        {...props}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        placeholder={props.placeholder}
        onChangeText={onInputChange}
        value={props.value || inputValue}
        style={[styles.input, isFocused ? styles.isFocused : '']}
      />
    </View>
  )
}

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
  }
})

export default InputField;
