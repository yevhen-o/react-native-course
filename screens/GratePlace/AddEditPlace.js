import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

import SCREENS from 'navigation/Screens';
import PButton from 'components/PButton';
import TextInput from 'components/TextInput';
import PageWrapper from 'components/PageWrapper';
import ImagePicker from 'components/ImagePicker';
import ProgressIndicator from 'components/ProgressIndicator';
import { userAddEditPlace } from 'redux/actions/placeActions';
import { getValidationErrors } from 'common/validationHelper';

const AddEditPlace = ({ navigation, route }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: (route.params || {}).item
        ? `Edit -> ${route.params.item.title} !`
        : 'Add new Place',
    });
  }, [navigation, route]);

  const RULES = {
    imageData: {
      isRequired: true,
    },
    title: {
      isRequired: true,
      minLength: 3,
      maxLength: 80,
    },
    description: {
      isRequired: true,
      minLength: 10,
      maxLength: 256,
    },
  };

  const [formFields, setFormFields] = useState([
    {
      key: 'imageData',
      label: 'Place image',
    },
    {
      key: 'title',
      label: 'Place title',
    },
    {
      key: 'description',
      label: 'Place description',
    },
  ]);

  const [values, setValues] = useState({
    ...((route.params || {}).item || {}),
  });

  const [initialValues] = useState({
    ...((route.params || {}).item || {}),
  });

  const [formErrors, setFormErrors] = useState(
    getValidationErrors(values, RULES),
  );

  const handleInputChange = (key, newValue, { formErrors }) => {
    setValues((values) => ({ ...values, [key]: newValue }));
    setFormErrors(formErrors);
    console.log(values);
    console.log(formErrors);
  };

  const isFormValid = () =>
    !Object.keys(formErrors).some((key) => !!formErrors[key]);

  const hasChanges = () => {
    return Object.keys(values).some(
      (key) =>
        JSON.stringify(values[key]) !== JSON.stringify(initialValues[key]),
    );
  };

  const handleSave = () => {
    const errors = getValidationErrors(values, RULES);
    setFormErrors(errors);
    if (!isFormValid()) {
      const newFormFields = [...formFields];
      newFormFields.forEach((field) => {
        field.isTouched = true;
      });
      setFormFields(newFormFields);
    } else {
      saveAction();
    }
  };

  const saveAction = () => {
    dispatch(userAddEditPlace(values)).then(
      navigation.navigate(SCREENS.GratePlace),
    );
  };

  const { isFetching: isSaving } = useSelector(
    (state) => state.shop.userAddEditProductState,
  );

  return (
    <PageWrapper>
      {isSaving && <ProgressIndicator isLine />}
      {formFields
        .filter(({ key }) => key !== 'imageData')
        .map(({ key, label, isTouched }) => (
          <TextInput
            rules={RULES}
            values={values}
            formErrors={formErrors}
            onChange={handleInputChange.bind(this, key)}
            key={key}
            fieldKey={key}
            label={label}
            style={styles.input}
            isTouched={isTouched}
          />
        ))}
      <ImagePicker
        rules={RULES}
        values={values}
        formErrors={formErrors}
        key={'imageData'}
        fieldKey={'imageData'}
        label={'Place image'}
        onChange={handleInputChange.bind(this, 'imageData')}
      />
      <PButton
        isFullWidth
        onPress={handleSave}
        isDisabled={isSaving || !isFormValid() || !hasChanges()}
        title={(route.params || {}).item ? 'Save' : 'Create new place'}
      />
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    display: 'flex',
  },
});

export default AddEditPlace;
