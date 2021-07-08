import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { MEALS } from 'data/dummyData';
import { COLORS } from 'common/constants';

import PlatesList from 'components/PlatesList';
import NothingToDisplay from 'components/NothingToDisplay';

const Favorites = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: COLORS.accent,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, route]);

  const favorite = useSelector((store) => store.meals.favorite);

  const favorites = MEALS.filter((m) => favorite.some((c) => c === m.id));

  if (favorites.length === 0) {
    return <NothingToDisplay />;
  }

  return (
    <PlatesList
      data={favorites}
      color={COLORS.accent}
      navigation={navigation}
    />
  );
};

export default Favorites;
