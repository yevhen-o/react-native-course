import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import BodyText from '../components/BodyText';

const GameFinished = (props) => {

  return (
    <View style={styles.container}>
      <BodyText style={{ marginBottom: 30 }}>{`Комп вгадав число ${props.num} із ${props.iterations}-ї спроби`}</BodyText>
      <Button title={'Розпочати нову гру'} onPress={props.handleStartGame.bind(null, '')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
});

export default GameFinished;
