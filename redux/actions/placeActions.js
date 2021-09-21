import { AT } from 'redux/ActionsTypes';
import {
  actionFactory,
  getPlacesFn,
  userRemovePlaceFn,
  userAddEditPlaceFn,
} from 'Api/Api';

export const setSectionFetching = (section, ...args) => ({
  type: AT.SECTION_FETCHING,
  payload: { ...args },
  section,
});

export const setSectionFetched = (section, data, ...args) => ({
  type: AT.SECTION_FETCHED,
  payload: { data, ...args },
  section,
});

export const setSectionRejected = (section, ...args) => ({
  type: AT.SECTION_REJECTED,
  payload: { ...args },
  section,
});

export const placeRemove = (section, data, payload) => ({
  type: AT.PLACE_REMOVE,
  payload,
});

export const placeAddEdit = (section, data, payload) => ({
  type: AT.PLACE_ADD_EDIT,
  payload: { id: data.name, ...payload },
});

export const getPlaces = actionFactory(
  getPlacesFn,
  setSectionFetching,
  setSectionFetched,
  setSectionRejected,
  'placesState',
);

export const userRemovePlace = actionFactory(
  userRemovePlaceFn,
  setSectionFetching,
  [setSectionFetched, placeRemove],
  setSectionRejected,
  'userRemovePlace',
);

export const userAddEditPlace = actionFactory(
  userAddEditPlaceFn,
  setSectionFetching,
  [setSectionFetched, placeAddEdit],
  setSectionRejected,
  'userAddEditPlaceState',
);
