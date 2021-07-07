import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';

import BodyText from '../components/BodyText';

const GameActions = (props) => {

  const getNumber = (min, max, exclude) => {
    const num = Math.floor(Math.random() * (max - min + 1) + min)
    if(exclude && num === exclude){
      return getNumber(min, max, exclude);
    }
    return num;
  }

  const [tryes, setTryes] = useState([]);

  const addNewSuggestion = (isGrater = false) => {

    if(
      (isGrater && +tryes[0] > +props.suggestedNumber) || 
      (!isGrater && +tryes[0] < +props.suggestedNumber)
    ){
      Alert.alert(
        "Комп не намахаєш",
        `Загадане число ---> ${props.suggestedNumber}`,
        [
          { text: "Зрозуміло більше не буду"}
        ]
      );
      return console.log('wrong suggestion')
    }

    let num
    
    if(isGrater){
      setLimits(limits => ({...limits, min: tryes[0]}))
      num = getNumber(tryes[0], limits.max)
    } else {
      setLimits(limits => ({...limits, max: tryes[0]}))
      num = getNumber(limits.min, tryes[0])

    }

    if(+num === +props.suggestedNumber){
      props.handleFinishGame(num, tryes.length);
    }
    setTryes(tryes => ([num, ...tryes]));
  }


  const [limits, setLimits] = useState({ min: 0, max: 100 });

  useEffect(() => {
    setTryes([getNumber(0, 100, props.suggestedNumber)]);
  }, [])

  return (
    <View style={styles.container}>
      {!!tryes && !!tryes.length && ( 
        <BodyText>{tryes[0]}</BodyText>
      )}
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button onPress={addNewSuggestion.bind(null, false)} title="Менше" />
        </View>
        <View style={styles.button}>
          <Button onPress={addNewSuggestion.bind(null, true)} title='Більше' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
});

export default GameActions;
