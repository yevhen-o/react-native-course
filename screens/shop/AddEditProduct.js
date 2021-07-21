import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PButton from 'components/PButton';
import TextInput from 'components/TextInput';
import PageWrapper from 'components/PageWrapper';
import { userAddEditProduct } from 'redux/actions/shopActions';
import ProgressIndicator from 'components/ProgressIndicator';
import { getValidationErrors } from 'common/validationHelper';
import SCREENS from 'navigation/Screens';

const AddEditProject = ({ navigation, route }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: (route.params || {}).item
        ? `Edit -> ${route.params.item.title} !`
        : 'Add new product',
    });
  }, [navigation, route]);

  const RULES = {
    imageUrl: {
      isRequired: true,
      isUrl: true,
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
    price: {
      isRequired: true,
      numbersWithDecimalOnly: true,
    },
  };

  const [formFields, setFormFields] = useState([
    {
      key: 'imageUrl',
      label: 'Product image',
    },
    {
      key: 'title',
      label: 'Product title',
    },
    {
      key: 'description',
      label: 'Product description',
    },
    {
      key: 'price',
      label: 'Product price',
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
    dispatch(userAddEditProduct(values)).then(
      navigation.navigate(SCREENS.ShopProductsList),
    );
  };

  const { isFetching: isSaving } = useSelector(
    (state) => state.shop.userAddEditProductState,
  );

  return (
    <PageWrapper>
      {isSaving && <ProgressIndicator isLine />}
      {formFields.map(({ key, label, isTouched }) => (
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
      <PButton
        isFullWidth
        onPress={handleSave}
        isDisabled={isSaving || !isFormValid() || !hasChanges()}
        title={(route.params || {}).item ? 'Save' : 'Create new product'}
      />
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    display: 'flex',
  },
});

export default AddEditProject;
