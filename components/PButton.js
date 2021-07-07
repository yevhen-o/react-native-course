import { COLORS, SPACES } from 'common/constants';
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import IonIcons from './IonIcons';

import PText from './PText';

const PButton = ({
  onPress,
  children,
  isPrimary,
  isSecondary,
  isOutlined,
  isFlat,
  isSmall,
  isLarge,
  isFullWidth,
  title,
  iconBefore,
  iconAfter,
  isDisabled,
  icon,
}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: COLORS.accent,
      borderRadius: SPACES.xSmall,
      marginVertical: SPACES.xSmall,
      paddingHorizontal: SPACES.normal,
      paddingVertical: SPACES.small,
    },
    text: {
      color: COLORS.light,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 20,
      textAlign: 'center',
    },
  });

  const getButtonStyle = () => {
    const style = {
      paddingHorizontal: SPACES.normal,
      paddingVertical: SPACES.small,
    };
    if (isFullWidth) {
      style.alignSelf = undefined;
    }
    if (isSmall) {
      style.paddingHorizontal = SPACES.small;
      style.paddingVertical = SPACES.xSmall;
    }
    if (isLarge) {
      style.paddingHorizontal = SPACES.xLarge;
      style.paddingVertical = SPACES.normal;
    }
    if (icon) {
      style.paddingHorizontal = style.paddingVertical;
      style.borderRadius = SPACES.xLarge;
    }
    if (isDisabled) {
      if ((!isSecondary && !isFlat && !isOutlined) || isPrimary) {
        style.backgroundColor = COLORS.disabled;
        return style;
      }
      if (isOutlined) {
        style.borderColor = COLORS.disabled;
        style.backgroundColor = 'transparent';
        style.borderWidth = 1;
        return style;
      }
    }
    if (isPrimary) {
      return style;
    }
    if (isSecondary || isFlat) {
      style.backgroundColor = 'transparent';
      return style;
    }
    if (isOutlined) {
      style.borderWidth = 1;
      style.borderColor = COLORS.accent;
      style.backgroundColor = 'transparent';
    }
    return style;
  };

  const getTextStyle = () => {
    const style = { color: COLORS.light };
    if (isDisabled && (isSecondary || isFlat || isOutlined)) {
      style.color = COLORS.disabled;
      return style;
    }
    if (isPrimary) {
      return style;
    }
    if (isSecondary || isFlat || isOutlined) {
      style.color = COLORS.accent;
      return style;
    }
    return style;
  };

  const getIconSize = () => {
    if (isLarge) {
      return 28;
    }
    if (isSmall) {
      return 16;
    }
    return 20;
  };

  const dynamicTextStyles = getTextStyle();

  const WrapCmp = isDisabled ? View : TouchableOpacity;

  return (
    <WrapCmp onPress={isDisabled ? undefined : onPress}>
      <View style={{ ...styles.button, ...getButtonStyle() }}>
        {icon ? (
          <View>
            <IonIcons
              size={getIconSize()}
              color={dynamicTextStyles.color}
              name={icon}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACES.xLarge,
            }}>
            {iconBefore && (
              <IonIcons
                size={getIconSize()}
                color={dynamicTextStyles.color}
                style={{ marginRight: SPACES.small }}
                name={iconBefore}
              />
            )}
            <PText style={{ ...styles.text, ...dynamicTextStyles }}>
              {title || children || 'Button'}
            </PText>
            {iconAfter && (
              <IonIcons
                size={getIconSize()}
                color={dynamicTextStyles.color}
                style={{ marginLeft: SPACES.small }}
                name={iconAfter}
              />
            )}
          </View>
        )}
      </View>
    </WrapCmp>
  );
};

export default PButton;
