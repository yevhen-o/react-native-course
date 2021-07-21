import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import BodyText from '../components/BodyText';
import TextInput from '../components/TextInput';

const GameScreen = (props) => {
  const [number, setNumber] = useState('');

  const handleChange = (num) => {
    const regex = /^[0-9]+$/;
    if (num.toString().match(regex) && +num > 0 && +num < 100) {
      setNumber(num);
    }
  };

  return (
    <View style={styles.container}>
      <BodyText
        style={{ fontSize: 22, paddingHorizontal: 40, textAlign: 'center' }}>
        Дай компу шанс вгадати число!!!
      </BodyText>
      <BodyText>Загадай число від 1 до 99</BodyText>
      <View style={{ width: 300 }}>
        <TextInput
          label={'Number'}
          onChange={handleChange}
          value={number}
          keyboardType={'number-pad'}
        />
      </View>
      <View>
        <Button
          title="Готово!"
          onPress={props.handleStartGame.bind(null, number)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default GameScreen;
