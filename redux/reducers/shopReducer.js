import { AT } from 'redux/ActionsTypes';
import {
  defaultSectionState,
  handleSectionFetched,
  handleSectionFetching,
  handleSectionRejected,
} from './helpers';

const initialState = {
  productsState: {
    ...defaultSectionState,
  },
  userProductsState: {
    ...defaultSectionState,
  },
};

export const shopReducer = (state = initialState, action) => {
  const { type, payload, section } = action;
  switch (type) {
    case AT.SECTION_FETCHING:
      return handleSectionFetching(state, { section, data: payload.data });
    case AT.SECTION_FETCHED:
      return handleSectionFetched(state, { section, data: payload.data });
    case AT.SECTION_REJECTED:
      return handleSectionRejected(state, { section, data: payload.data });
    default:
      return state;
  }
};
