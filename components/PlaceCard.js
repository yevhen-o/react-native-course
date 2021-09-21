import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';

import Card from 'components/Card';
import PText from 'components/PText';
import PButton from 'components/PButton';
import { COLORS } from 'common/constants';

const PlaceCard = ({
  item: { title, imageUrl, imageData, address = '' },
  item,
  onSelect,
  renderButtons,
}) => {
  return (
    <Card style={styles.project}>
      <TouchableOpacity style={styles.link} onPress={onSelect}>
        <ImageBackground
          style={styles.image}
          source={{ uri: imageUrl || imageData }}></ImageBackground>
        <View style={styles.info}>
          <PText numberOfLines={3} isH2>
            {title}
          </PText>
          <View style={styles.row}>
            <PText>Address:</PText>
            <PText isBold>{address}</PText>
          </View>
          <View style={{ ...styles.row, ...styles.actions }}>
            {renderButtons && typeof renderButtons === 'function'
              ? renderButtons(item)
              : [
                  <PButton
                    isFullWidth
                    key="onselect"
                    onPress={onSelect}
                    isOutlined>
                    View detail
                  </PButton>,
                ]}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  actions: {
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  image: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
  },
  info: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  link: {
    flex: 1,
  },
  project: {
    backgroundColor: COLORS.light,
    flex: 1,
    height: 300,
    margin: 10,
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlaceCard;
