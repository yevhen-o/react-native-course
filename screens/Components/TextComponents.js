import React from 'react';

import { View } from 'react-native';

import PText from 'components/PText';
import Card from 'components/Card';
import PageWrapper from 'components/PageWrapper';
import NothingToDisplay from 'components/NothingToDisplay';
import ErrorText from 'components/ErrorText';

const TextComponents = () => {
  return (
    <PageWrapper style={{ paddingTop: 24 }}>
      <View>
        <PText isH1>App headings and texts</PText>
        <Card isWhite>
          <View style={{ flex: 1 }}>
            <PText isH1>H1 app text</PText>

            <PText isH2>H2 app text</PText>

            <PText isH3>H3 app text</PText>

            <PText isH4>H4 app text</PText>

            <PText isBold>Bold regular app text</PText>

            <PText>Normal regular app text</PText>
          </View>
        </Card>

        <PText isH1>Something goes wrong component</PText>
        <ErrorText />
        <PText isH1>Nothing to display component</PText>
        <NothingToDisplay />
      </View>
    </PageWrapper>
  );
};

export default TextComponents;
