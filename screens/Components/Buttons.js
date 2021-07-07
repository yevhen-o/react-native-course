import React from 'react';

import { View } from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import PButton from 'components/PButton';

const Buttons = () => {
  return (
    <View>
      <PText isH1>App Buttons</PText>
      <Card isWhite>
        <View style={{ flex: 1 }}>
          <PText isH3>Regular app buttons</PText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <PButton onPress={() => alert('Button pressed')} title="Primary" />

            <PButton
              isSecondary
              onPress={() => alert('Button pressed')}
              title="Secondary"
            />

            <PButton
              isOutlined
              onPress={() => alert('Button pressed')}
              title="Outlined"
            />
          </View>

          <PButton
            isFullWidth
            onPress={() => alert('Button pressed')}
            title="Full width primary regular"
          />
        </View>
      </Card>
      <Card isWhite>
        <View style={{ flex: 1 }}>
          <PText isH3>Small Buttons</PText>
          <View style={{ flexDirection: 'row' }}>
            <PButton
              isSmall
              onPress={() => alert('Button pressed')}
              title="Primary"
            />
            <PButton
              isSmall
              isSecondary
              onPress={() => alert('Button pressed')}
              title="Secondary"
            />
            <PButton
              isSmall
              isOutlined
              onPress={() => alert('Button pressed')}
              title="Outlined"
            />
          </View>
          <PButton
            isFullWidth
            isOutlined
            isSmall
            onPress={() => alert('Button pressed')}
            title="Full width outlined small"
          />
        </View>
      </Card>
      <Card isWhite>
        <View style={{ flex: 1 }}>
          <PText isH3>Large Buttons</PText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <PButton
              isLarge
              onPress={() => alert('Button pressed')}
              title="Primary"
            />
            <PButton
              isLarge
              isSecondary
              onPress={() => alert('Button pressed')}
              title="Secondary"
            />
            <PButton
              isLarge
              isOutlined
              onPress={() => alert('Button pressed')}
              title="Outlined"
            />
          </View>
          <PButton
            isFullWidth
            isSecondary
            isLarge
            onPress={() => alert('Button pressed')}
            title="Full width secondary large"
          />
        </View>
      </Card>

      <Card isWhite>
        <View style={{ flex: 1 }}>
          <PText isH3>Buttons with icons</PText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <PButton
              iconBefore="star"
              onPress={() => alert('Button pressed')}
              title="Primary"
            />
            <PButton
              isSecondary
              iconAfter={'star'}
              onPress={() => alert('Button pressed')}
              title="Secondary"
            />
            <PButton
              isOutlined
              isSmall
              iconBefore="star"
              onPress={() => alert('Button pressed')}
              title="Outlined small"
            />
          </View>
          <PButton
            isFullWidth
            isLarge
            iconAfter={'star'}
            onPress={() => alert('Button pressed')}
            title="Full width primary large"
          />
        </View>
      </Card>
      <Card isWhite>
        <View style={{ flex: 1 }}>
          <PText isH3>Regular app Disabled buttons</PText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <PButton
              isDisabled
              onPress={() => alert('Button pressed')}
              title="Primary"
            />

            <PButton
              isDisabled
              isSecondary
              onPress={() => alert('Button pressed')}
              title="Secondary"
            />

            <PButton
              isOutlined
              isDisabled
              onPress={() => alert('Button pressed')}
              title="Outlined"
            />
          </View>

          <PButton
            isDisabled
            isFullWidth
            onPress={() => alert('Button pressed')}
            title="Full width primary regular"
          />
        </View>
      </Card>
      <Card isWhite>
        <View style={{ flex: 1 }}>
          <PText isH3>Just Icon buttons</PText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <PButton
              icon="star"
              onPress={() => alert('Button pressed')}
              title="Primary"
            />

            <PButton
              icon="star"
              isSecondary
              onPress={() => alert('Button pressed')}
              title="Secondary"
            />

            <PButton
              isOutlined
              isLarge
              icon="star"
              onPress={() => alert('Button pressed')}
              title="Outlined"
            />
            <PButton
              isDisabled
              icon="star"
              onPress={() => alert('Button pressed')}
              title="Primary"
            />

            <PButton
              isDisabled
              icon="star"
              isSecondary
              onPress={() => alert('Button pressed')}
              title="Secondary"
            />

            <PButton
              isOutlined
              isSmall
              isDisabled
              icon="star"
              onPress={() => alert('Button pressed')}
              title="Outlined"
            />
          </View>

          <PButton
            icon="star"
            isFullWidth
            onPress={() => alert('Button pressed')}
            title="Full width primary regular"
          />
          <PButton
            icon="star"
            isFullWidth
            isDisabled
            onPress={() => alert('Button pressed')}
            title="Full width primary regular"
          />
        </View>
      </Card>
    </View>
  );
};

export default Buttons;
