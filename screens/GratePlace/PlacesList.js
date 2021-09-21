import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PageWrapper from 'components/PageWrapper';

import PButton from 'components/PButton';
import SCREENS from 'navigation/Screens';
import PlacesFlatList from 'components/PlacesFlatList';

import { getPlaces } from 'redux/actions/placeActions';
import ProgressIndicator from 'components/ProgressIndicator';

const PlacesList = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const loadPlaces = () => {
    dispatch(getPlaces());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPlaces();
    });

    return unsubscribe;
  }, [loadPlaces, navigation]);

  useEffect(() => {
    loadPlaces();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: function addButton() {
        return (
          <PButton
            isSecondary
            icon="add-circle"
            onPress={() => navigation.navigate(SCREENS.AddEditPlace)}></PButton>
        );
      },
    });
  }, [navigation, route]);

  const placesState = useSelector((state) => state.places.placesState);

  return (
    <PageWrapper isWithoutScrollView>
      {placesState.isFetching && !Object.keys(placesState.data).length && (
        <ProgressIndicator />
      )}
      {!!Object.keys(placesState.data).length && (
        <PlacesFlatList
          onRefresh={loadPlaces}
          isFetching={placesState.isFetching}
          data={Object.values(placesState.data)}
          navigation={navigation}
        />
      )}
    </PageWrapper>
  );
};

export default PlacesList;
