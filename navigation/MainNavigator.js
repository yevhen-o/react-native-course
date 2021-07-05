
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import GameScreen from '../screens/GameScreen';
import GoalsScreen from '../screens/GoalsScreen';
import Meals from '../screens/meals/Meals';
import Categories from '../screens/meals/Categories';
import Category from '../screens/meals/Category';
import Favorite from '../screens/meals/Favorite';
import Filters from '../screens/meals/Filters';
import MealDetail from '../screens/meals/MealDetail';

const Stack = createStackNavigator();

export const SCREENS = {
  Goals: 'Goals',
  Game: 'Game',
  Meals: 'Meals',
  Categories: 'Categories',
  Category: 'Category',
  Favorite: 'Favorite',
  Filters: 'Filters',
  MealDetail: 'MealDetail',
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Meals">
        <Stack.Screen name={SCREENS.Goals} component={GoalsScreen} options={{ title: 'Компоненти'}} />
        <Stack.Screen name={SCREENS.Game} component={GameScreen} options={{ title: 'Загадай число' }} />
        <Stack.Screen name={SCREENS.Meals} component={Meals} options={{ title: 'The Meals App' }} />
        <Stack.Screen name={SCREENS.Categories} component={Categories} options={{ title: 'The Meals Categories' }} />
        <Stack.Screen name={SCREENS.Category} component={Category} 
          options={({ route }) => { 
            return { title: route.params.item.title }
        }} />
        <Stack.Screen name={SCREENS.Favorite} component={Favorite} options={{ title: 'The Meals Favorite' }} />
        <Stack.Screen name={SCREENS.Filters} component={Filters} options={{ title: 'The Meals Filters' }} />
        <Stack.Screen name={SCREENS.MealDetail} component={MealDetail} options={{ title: 'The Meal Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;