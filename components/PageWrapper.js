import React from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';

import { COLORS, SPACES } from 'common/constants';

const PageWrapper = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>{props.children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    flex: 1,
    paddingBottom: SPACES.regular,
    paddingLeft: SPACES.regular,
    paddingRight: SPACES.regular,
    paddingTop: SPACES.large,
  },
});

export default PageWrapper;
