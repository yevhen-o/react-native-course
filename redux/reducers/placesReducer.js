import { AT } from 'redux/ActionsTypes';
import {
  defaultSectionState,
  handleSectionFetched,
  handleSectionFetching,
  handleSectionRejected,
} from './helpers';

const initialState = {
  placesState: {
    ...defaultSectionState,
  },
  userRemovePlace: {
    ...defaultSectionState,
  },
  userAddEditPlaceState: {
    ...defaultSectionState,
  },
};

export const placesReducer = (state = initialState, action) => {
  const { type, payload, section } = action;
  switch (type) {
    case AT.SECTION_FETCHING:
      return handleSectionFetching(state, { section, data: payload.data });
    case AT.SECTION_FETCHED:
      return handleSectionFetched(state, { section, data: payload.data });
    case AT.SECTION_REJECTED:
      return handleSectionRejected(state, { section, data: payload.data });
    case AT.PLACE_REMOVE: {
      const placesState = {
        ...state.placesState,
        data: { ...state.placesState.data },
      };
      if (placesState.data[payload.placeId]) {
        delete placesState.data[payload.placeId];
      }
      return {
        ...state,
        placesState,
      };
    }
    case AT.PLACE_ADD_EDIT: {
      return {
        ...state,
        placesState: {
          ...state.placesState,
          data: {
            ...state.placesState.data,
            [payload.id]: payload,
          },
        },
      };
    }
    default:
      return state;
  }
};
