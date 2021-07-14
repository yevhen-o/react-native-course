import React, { useLayoutEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import TextInput from 'components/TextInput';
import PageWrapper from 'components/PageWrapper';

const AddEditProject = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit -> ' + route.params.item.title + '!',
    });
  }, [navigation, route]);

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

  const [values, setValues] = useState({ ...(route.params.item || {}) });

  const handleInputChange = (key, newValue) => {
    setValues((values) => ({ ...values, [key]: newValue }));
  };

  return (
    <PageWrapper>
      {formFields.map(({ key, label }) => (
        <TextInput
          value={values[key].toString()}
          onChange={handleInputChange.bind(this, key)}
          key={key}
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
