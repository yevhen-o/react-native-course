import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import * as expoImagePicker from 'expo-image-picker';
import * as ExpoPermissions from 'expo-permissions';

import PButton from './PButton';
import PText from './PText';
import FieldLabel from './FieldLabel';
import FieldHelpText from './FieldHelpText';
import { checkValidity } from 'common/validationHelper';

const defaultObj = {};

const ImagePicker = ({
  label,
  value,
  rules = defaultObj,
  values = defaultObj,
  fieldKey = '',
  onChange,
  helpText,
  placeholder,
  formErrors = defaultObj,
  isTouched: initialTouched,
  // ...restProps
}) => {
  const [inputValue, setValue] = useState(value || values[fieldKey] || '');
  const [fieldState, setFieldState] = useState({
    isFocused: false,
    isTouched: initialTouched,
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

  const verifyPermissions = async () => {
    const result = await ExpoPermissions.askAsync(ExpoPermissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }],
      );
      return false;
    }
    return true;
  };

  const handleOpenImagePicker = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await expoImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [16, 9],
      base64: true,
    });
    const dataImage = 'data:image/jpeg;base64,' + image.base64;
    const { isValid, errorMessage } = checkValidity(dataImage, rules[fieldKey]);

    if (onChange && typeof onChange === 'function') {
      onChange(dataImage, {
        formErrors: { ...formErrors, [fieldKey]: errorMessage },
      });
    }
    setFieldState((state) => ({ ...state, isValid, errorMessage }));
    setValue(dataImage);
  };

  return (
    <View style={styles.imagePicker}>
      <FieldLabel
        isFloating
        hasError={!isValid && isTouched}
        isFloated={isFocused || !!value || !!inputValue || !!placeholder}>
        {label}
      </FieldLabel>
      <View style={styles.imagePreview}>
        {inputValue ? (
          <Image source={{ uri: inputValue }} style={styles.image} />
        ) : (
          <PText>No image picked yet.</PText>
        )}
      </View>
      <PButton title="Take Image" onPress={handleOpenImagePicker} />
      {helpText && isValid && <FieldHelpText>{helpText}</FieldHelpText>}
      {!isValid && errorMessage && isTouched && (
        <FieldHelpText hasError>{errorMessage}</FieldHelpText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    alignItems: 'center',
    borderWidth: 1,
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
});

export default ImagePicker;
