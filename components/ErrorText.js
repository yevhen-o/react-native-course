import React from 'react';
import { StyleSheet } from 'react-native';

import Card from 'components/Card';
import IonIcons from 'components/IonIcons';
import BodyText from 'components/BodyText';
import { COLORS } from '../common/constants';

const ErrorText = props => {
  return (
    <Card style={styles.container}>
      <IonIcons color='yellow' name="warning" />
      <BodyText style={styles.text}>{props.errorText || props.children || 'Something goes wrong, please try again!'}</BodyText>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {margin: 20, padding: 20, backgroundColor: COLORS.light, flex: undefined, height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'},
  text: {marginLeft: 20}
})

export default ErrorText;