import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';

import Head from '../components/Head';
import TextInput from '../components/TextInput';

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14, 
    paddingBottom: 14,
  }
});


export default GoalsScreen;