import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';

import Head from 'components/Head';
import TextInput from 'components/TextInput';

import PText from 'components/PText';
import { COLORS } from 'common/constants';

const GoalsScreen = () => {

  const [text, setText] = useState('My first RN app!!!')

  const [goalTitle, setGoalTitle] = useState('')

  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    setGoals(goals => ([...goals, goalTitle]));
    setGoalTitle('');
  }

  const handleRemove = index => {
    setGoals(goals => {
      goals.splice(index, 1)
      return [...goals]
    });
  }

  return (
    <View style={styles.container}>
      <Head />
      <View>
        <TextInput 
          label={'Goal title'} 
          placeholder="Please enter goal title" 
          onChange={setGoalTitle} 
          value={goalTitle} 
        />
        <Button title='Add Goal' onPress={handleAddGoal} />
      </View>
      <ScrollView>
        {goals.map((goal, index) => (
            <View key={`${goal}__${index}`} style={styles.item} >
              <Text>{goal}</Text>
              <TouchableOpacity onLongPress={handleRemove.bind(this, index)}><Text>Remove</Text></TouchableOpacity>
            </View>
        ))}
      </ScrollView>
      <Text>{text}</Text> 
      <Text>Not bad, at all...</Text>

      <Button title='Change text' onPress={() => setText('The button works correct!!!')} />

      <PText>Normal regular app text</PText>
      <PText isBold>Bold regular app text</PText>
      <PText isH1>H1 app text</PText>
      <PText isH2>H2 app text</PText>
      <PText isH3>H3 app text</PText>
      <PText isH4>H4 app text</PText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    flex: 1,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14, 
    paddingTop: 14,
  }
});


export default GoalsScreen;