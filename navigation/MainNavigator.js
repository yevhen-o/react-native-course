
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Filters from 'screens/meals/Filters';
import GameScreen from 'screens/GameScreen';
import GoalsScreen from 'screens/GoalsScreen';
import Category from 'screens/meals/Category';
import Favorite from 'screens/meals/Favorite';
import Categories from 'screens/meals/Categories';
import MealDetail from 'screens/meals/MealDetail';

const MealsStack = createStackNavigator();
const FilterMealsStack = createStackNavigator();
const FavoriteMealsStack = createStackNavigator();

export const SCREENS = {
  Game: 'Game',
  Goals: 'Goals',
  Filters: 'Filters',
  Category: 'Category',
  Favorite: 'Favorite',
  Categories: 'Categories',
  MealDetail: 'MealDetail',

  MealsStack: 'MealsStack',
  FilterStack: 'FilterStack',
  FavoriteStack: 'FavoriteStack',
}

const MealsAppStack = [
  {name: SCREENS.Categories , component: Categories, options: { title: 'Choose the category'}},
  {name: SCREENS.Category , component: Category, options: { title: 'The Meals Category'}},
  {name: SCREENS.Favorite , component: Favorite, options: { title: 'The Meals Favorite'}},
  {name: SCREENS.MealDetail , component: MealDetail, options: { title: 'The Meal Detail'}},
]

const MealsAppFavoriteStack = [
  {name: SCREENS.Favorite , component: Favorite, options: { title: 'The Meals Favorite'}},
  {name: SCREENS.MealDetail , component: MealDetail, options: { title: 'The Meal Detail'}},
]

const MealsAppFilterStack = [
  {name: SCREENS.Filters , component: Filters, options: { title: 'The Meals Filters'}},
  {name: SCREENS.Category , component: Category, options: { title: 'The Meals Category'}},
  {name: SCREENS.Categories , component: Categories, options: { title: 'The Meals Categories'}},
  {name: SCREENS.MealDetail , component: MealDetail, options: { title: 'The Meal Detail'}},
]

const MealsAppStackNavigator = () => (
  <MealsStack.Navigator initialRouteName={SCREENS.Categories}>
    {MealsAppStack.map(row => <MealsStack.Screen key={row.name} {...row} />)}
  </MealsStack.Navigator>
)

const MealsAppFavoriteStackNavigator = () => (
  <FavoriteMealsStack.Navigator initialRouteName={SCREENS.Favorite}>
    {MealsAppFavoriteStack.map(row => <FavoriteMealsStack.Screen key={row.name} {...row} />)}
  </FavoriteMealsStack.Navigator>
)

const MealsAppFilterStackNavigator = () => (
  <FilterMealsStack.Navigator initialRouteName={SCREENS.Favorite}>
    {MealsAppFilterStack.map(row => <FilterMealsStack.Screen key={row.name} {...row} />)}
  </FilterMealsStack.Navigator>
)

const Tab = createBottomTabNavigator(); 

const renderIcon = iconName => ({ focused, color, size }) => (<Ionicons name={iconName} size={size} color={color} />);

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={SCREENS.MealsStack} component={MealsAppStackNavigator} options={{ title: 'Meals', tabBarIcon: renderIcon('restaurant')}} />
        <Tab.Screen name={SCREENS.FavoriteStack} component={MealsAppFavoriteStackNavigator} options={{ title: 'Favorite', tabBarIcon: renderIcon('star')}} />
        <Tab.Screen name={SCREENS.FilterStack} component={MealsAppFilterStackNavigator} options={{ title: 'Filter', tabBarIcon: renderIcon('settings') }} />


     {/*    <Stack.Screen name={SCREENS.Goals} component={GoalsScreen} options={{ title: 'Компоненти'}} />
        <Stack.Screen name={SCREENS.Game} component={GameScreen} options={{ title: 'Загадай число' }} />
        <Stack.Screen name={SCREENS.Category} component={Category} 
          options={({ route }) => { 
            return { title: route.params.item.title }
        }} /> */}

        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;