import React from 'react';

import { View } from 'react-native';

import PText from 'components/PText';
import Card from 'components/Card';
import PageWrapper from 'components/PageWrapper';

const TextComponents = () => {
  return (
    <PageWrapper>
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
      </View>
    </PageWrapper>
  );
};

export default TextComponents;
