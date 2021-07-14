import { AT } from 'redux/ActionsTypes';

export const toggleMealFavorite = (mealId) => ({
  type: AT.MEALS_TOGGLE_FAVORITE,
  mealId,
});

export const mealsUpdateFilters = (filters) => ({
  type: AT.MEALS_UPDATE_FILTERS,
  filters,
});
