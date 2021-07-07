import React, { useState } from 'react';

import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import Head from 'components/Head';
import TextInput from 'components/TextInput';

import PText from 'components/PText';
import PButton from 'components/PButton';
import { COLORS } from 'common/constants';

const GoalsScreen = () => {
  const [goalTitle, setGoalTitle] = useState('');

  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    setGoals((goals) => [...goals, goalTitle]);
    setGoalTitle('');
  };

  const handleRemove = (index) => {
    setGoals((goals) => {
      goals.splice(index, 1);
      return [...goals];
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Head />
        <View>
          <TextInput
            label={'Goal title'}
            placeholder="Please enter goal title"
            onChange={setGoalTitle}
            value={goalTitle}
          />
          <PButton isFullWidth title="Add Goal" onPress={handleAddGoal} />
        </View>
        <ScrollView>
          {goals.map((goal, index) => (
            <View key={`${goal}__${index}`} style={styles.item}>
              <PText>{goal}</PText>
              <TouchableOpacity onLongPress={handleRemove.bind(this, index)}>
                <PText>Remove</PText>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

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
  },
});

export default GoalsScreen;
