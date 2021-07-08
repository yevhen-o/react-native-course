import { AK } from 'redux/ActionsKeys';

export const toggleMealFavorite = (mealId) => ({
  type: AK.MEALS_TOGGLE_FAVORITE,
  mealId,
});

export const mealsUpdateFilters = (filters) => ({
  type: AK.MEALS_UPDATE_FILTERS,
  filters,
});
