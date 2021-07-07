import React, { useState } from 'react';

import { View, TouchableOpacity, Clipboard } from 'react-native';

import PText from 'components/PText';
import TextInput from 'components/TextInput';
import PageWrapper from 'components/PageWrapper';

const GoalsScreen = () => {
  const [goalTitle, setGoalTitle] = useState('');

  return (
    <PageWrapper>
      <View>
        <TextInput
          label={'Field label'}
          placeholder="Field placeholder"
          onChange={setGoalTitle}
          value={goalTitle}
        />

        <TextInput
          label={'Some Field label'}
          onChange={setGoalTitle}
          value={goalTitle}
        />

        <TouchableOpacity onPress={() => Clipboard.setString('mail@mail.com')}>
          <View>
            <PText>mail@mail.com</PText>
          </View>
        </TouchableOpacity>
      </View>
    </PageWrapper>
  );
};

export default GoalsScreen;
