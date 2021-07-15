import { AT } from 'redux/ActionsTypes';

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
