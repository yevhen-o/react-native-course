import React from 'react';
import { Switch, View, StyleSheet } from 'react-native';

import FieldLabel from './FieldLabel';
import FieldHelpText from './FieldHelpText';

import { COLORS, SPACES } from 'common/constants';

const PSwitch = ({
  value,
  hasError,
  label,
  helpText,
  errorText,
  ...restProps
}) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: SPACES.regular,
    },
    switch: {
      borderBottomWidth: helpText || hasError ? 2 : 0,
      borderColor: hasError ? COLORS.error : COLORS.primary,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: SPACES.small,
      paddingRight: SPACES.small,
      paddingTop: SPACES.small,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        {label && <FieldLabel hasError={hasError}>{label}</FieldLabel>}
        <Switch
          value={value}
          trackColor={{ false: COLORS.disabled, true: COLORS.primary }}
          thumbColor={value ? COLORS.accent : COLORS.primary}
          {...restProps}
        />
      </View>
      {helpText && !hasError && <FieldHelpText>{helpText}</FieldHelpText>}
      {hasError && errorText && (
        <FieldHelpText hasBorder hasError>
          {errorText}
        </FieldHelpText>
      )}
    </View>
  );
};

export default PSwitch;
