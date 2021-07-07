import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Clipboard,
} from 'react-native';

import TextInput from 'components/TextInput';

import PText from 'components/PText';
import { COLORS } from 'common/constants';

import TextComponents from './TextComponents';
import Buttons from './Buttons';

const GoalsScreen = () => {
  const [goalTitle, setGoalTitle] = useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextComponents />

        <Buttons />

        <TextInput
          label={'Goal title'}
          placeholder="Please enter goal title"
          onChange={setGoalTitle}
          value={goalTitle}
        />

        <TouchableOpacity onPress={() => Clipboard.setString('mail@mail.com')}>
          <View>
            <PText>mail@mail.com</PText>
          </View>
        </TouchableOpacity>
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
});

export default GoalsScreen;
