import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import PButton from 'components/PButton';
import PSwitch from 'components/PSwitch';
import TextInput from 'components/TextInput';
import PageWrapper from 'components/PageWrapper';
import { userLogin } from 'redux/actions/shopActions';
import { getValidationErrors } from 'common/validationHelper';
import ProgressIndicator from 'components/ProgressIndicator';
import { storageGet, storageKeys } from 'Api/AsyncStorageHelper';
import { setSectionFetched } from 'redux/actions/shopActions';

const Login = () => {
  const { isFetching } = useSelector((state) => state.shop.userLoginState);
  const [values, setValues] = useState({
    login: 'yevhenne@gmail.com',
    pass: 'ffffffff',
    isLogin: true,
  });

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(userLogin(values)).catch((e) => {
      const errKey = e.response.data.error.message;

      const messages = {
        EMAIL_EXISTS: 'User with this email already registered',
        INVALID_PASSWORD: 'Password is not valid',
        EMAIL_NOT_FOUND: 'User with this email is not registered',
      };

      Alert.alert('Error', messages[errKey], [{ text: 'Ok' }]);
    });
  };

  const RULES = {
    login: {
      isRequired: true,
      isEmail: true,
    },
    pass: {
      isRequired: true,
      minLength: 8,
    },
  };

  const [formErrors, setFormErrors] = useState(
    getValidationErrors(values, RULES),
  );

  const handleInputChange = (key, newValue, options = {}) => {
    const { formErrors } = options;
    setValues((values) => ({ ...values, [key]: newValue }));
    formErrors && setFormErrors(formErrors);
  };

  const isFormValid = () =>
    !Object.keys(formErrors).some((key) => !!formErrors[key]);

  useEffect(() => {
    const userLoginState = storageGet(storageKeys.userLoginState);
    if (userLoginState && userLoginState.data) {
      dispatch(setSectionFetched('userLoginState', userLoginState.data));
    }
  }, [dispatch]);

  return (
    <PageWrapper>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
        <View style={styles.container}>
          <PText isH1>{values.isLogin ? 'Login' : 'Sign UP'}</PText>
          <Card isWhite style={styles.fields}>
            <View style={{ flex: 1 }}>
              <TextInput
                rules={RULES}
                label="Login/email"
                formErrors={formErrors}
                key="login"
                fieldKey="login"
                values={values}
                keyBoardType="email-address"
                onChange={handleInputChange.bind(this, 'login')}
              />
              <TextInput
                rules={RULES}
                label="Password"
                formErrors={formErrors}
                key="pass"
                fieldKey="pass"
                values={values}
                secureTextEntry
                onChange={handleInputChange.bind(this, 'pass')}
              />
            </View>
          </Card>
          {isFetching && <ProgressIndicator />}
          {!isFetching && (
            <PButton
              isDisabled={!isFormValid()}
              onPress={handleLogin}
              isFullWidth
              title={values.isLogin ? 'Login' : 'Sign UP'}
            />
          )}
          <PSwitch
            label={values.isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            onValueChange={handleInputChange.bind(this, 'isLogin')}
            value={values.isLogin}
          />
        </View>
      </KeyboardAvoidingView>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fields: {
    marginBottom: 20,
    padding: 20,
    paddingTop: 8,
  },
});

export default Login;
