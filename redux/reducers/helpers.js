export const defaultSectionState = {
  isFetching: false,
  isFetched: false,
  isRejected: false,
  fetchedTime: null,
  data: {},
};

export const handleSectionFetching = (state, { section, data }) => {
  if (!state[section]) {
    return state;
  } else {
    return {
      ...state,
      [section]: {
        ...state[section],
        ...(data ? { data: { ...state[section].data, ...data } } : {}),
        isFetching: true,
        isFetched: false,
      },
    };
  }
};

export const handleSectionRejected = (state, { section, data }) => {
  if (!state[section]) {
    return state;
  } else {
    return {
      ...state,
      [section]: {
        ...state[section],
        ...(data ? { data: { ...state[section].data, ...data } } : {}),
        isFetching: false,
        isRejected: true,
      },
    };
  }
};

export const handleSectionFetched = (state, { section, data }) => {
  if (!state[section]) {
    return state;
  } else {
    return {
      ...state,
      [section]: {
        ...state[section],
        ...(data ? { data: { ...state[section].data, ...data } } : {}),
        isFetching: false,
        isRejected: false,
        isFetched: true,
        fetchedTime: Date.now(),
      },
    };
  }
};

export default {
  defaultSectionState,
  handleSectionFetched,
  handleSectionFetching,
  handleSectionRejected,
};
