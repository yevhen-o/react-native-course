import { AT } from 'redux/ActionsTypes';

const initialState = {
  favorite: [],
  filters: {
    isGlutenFree: false,
    isLactoseFree: false,
    isVegetarian: false,
    isVegan: false,
  },
};

export const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.MEALS_TOGGLE_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.includes(action.mealId)
          ? state.favorite.filter((mId) => mId !== action.mealId)
          : [...state.favorite, action.mealId],
      };
    case AT.MEALS_UPDATE_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    default:
      return state;
  }
};
