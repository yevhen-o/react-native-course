import React from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';

import { SPACES } from 'common/constants';

const PageWrapper = (props) => {
  const Cmp = props.isWithoutScrollView ? View : ScrollView;
  return (
    <Cmp style={styles.wrapper}>
      <View style={styles.container}>{props.children}</View>
    </Cmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SPACES.regular,
    paddingLeft: SPACES.regular,
    paddingRight: SPACES.regular,
    paddingTop: SPACES.large,
  },
  wrapper: {
    flex: 1,
  },
});

export default PageWrapper;
