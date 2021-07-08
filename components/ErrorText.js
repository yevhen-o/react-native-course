import React from 'react';
import { StyleSheet } from 'react-native';

import Card from 'components/Card';
import IonIcons from 'components/IonIcons';
import PText from 'components/PText';
import { COLORS } from '../common/constants';

const ErrorText = (props) => {
  return (
    <Card style={styles.container}>
      <IonIcons color="yellow" name="warning" />
      <PText style={styles.text}>
        {props.errorText ||
          props.children ||
          'Something goes wrong, please try again!'}
      </PText>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.light,
    flex: undefined,
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'flex-start',
    margin: 20,
    padding: 20,
  },
  text: { lineHeight: 24, marginLeft: 20 },
});

export default ErrorText;
