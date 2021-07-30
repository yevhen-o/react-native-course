import React, { useState } from 'react';

import { View } from 'react-native';

import TextInput from 'components/TextInput';
import PageWrapper from 'components/PageWrapper';
import CopyButton from 'components/CopyButton';
import PSwitch from 'components/PSwitch';

const GoalsScreen = () => {
  const [goalTitle, setGoalTitle] = useState('');
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <PageWrapper style={{ paddingTop: 32 }}>
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
          helpText="Some text to describe this field"
          value={goalTitle}
        />

        <TextInput
          isTouched
          rules={{ title: { isRequired: true, minLength: 50, maxLength: 100 } }}
          formErrors={{ title: 'Some text to describe error' }}
          fieldKey="title"
          value={goalTitle}
          onChange={setGoalTitle}
          label={'Field with error'}
        />

        <CopyButton
          isOutlined
          afterPress={() => console.log('Copied')}
          title="Copy to clipboard"
          textToCopy={
            goalTitle ||
            `Try pass some text,
            in few lines`
          }
        />

        <PSwitch
          value={switchValue}
          label="Switch field no err no help"
          onValueChange={(newValue) => setSwitchValue(newValue)}
        />

        <PSwitch
          value={switchValue}
          label="Switch field with help"
          helpText="Some text to describe switch more"
          onValueChange={(newValue) => setSwitchValue(newValue)}
        />

        <PSwitch
          hasError
          value={switchValue}
          label="Switch field with err"
          onValueChange={(newValue) => setSwitchValue(newValue)}
          errorText="Some text to describe error"
        />
      </View>
    </PageWrapper>
  );
};

export default GoalsScreen;
