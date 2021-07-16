import React, { useLayoutEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import TextInput from 'components/TextInput';
import PageWrapper from 'components/PageWrapper';

const AddEditProject = ({ navigation, route }) => {
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
      minLength: 100,
      maxLength: 256,
    },
    price: {
      isRequired: true,
      numbersWithDecimalOnly: true,
    },
  };

  const [formFields] = useState([
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

  const handleInputChange = (key, newValue) => {
    setValues((values) => ({ ...values, [key]: newValue }));
  };

  return (
    <PageWrapper>
      {formFields.map(({ key, label }) => (
        <TextInput
          rules={RULES}
          values={values}
          onChange={handleInputChange.bind(this, key)}
          key={key}
          fieldKey={key}
          label={label}
          style={styles.input}
        />
      ))}
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    display: 'flex',
  },
});

export default AddEditProject;
