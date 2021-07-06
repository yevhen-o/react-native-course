
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Filters from 'screens/meals/Filters';
import GameScreen from 'screens/GameScreen';
import GoalsScreen from 'screens/GoalsScreen';
import Category from 'screens/meals/Category';
import Favorite from 'screens/meals/Favorite';
import Categories from 'screens/meals/Categories';
import MealDetail from 'screens/meals/MealDetail';

import BodyText from 'components/BodyText';
import IonIcons from 'components/IonIcons';

const MealsStack = createStackNavigator();
const FilterMealsStack = createStackNavigator();
const FavoriteMealsStack = createStackNavigator();

const GameStack = createStackNavigator();
const ComponentStack = createStackNavigator();

export const SCREENS = {
  Home: 'Home',
  Game: 'Game',
  Goals: 'Goals',
  Filters: 'Filters',
  Category: 'Category',
  Favorite: 'Favorite',
  Categories: 'Categories',
  MealDetail: 'MealDetail',
  Components: 'Components',

  MealsStack: 'MealsStack',
  FilterStack: 'FilterStack',
  FavoriteStack: 'FavoriteStack',
}

const renderMenu = ({navigation, route}) => ({
  headerLeft: (params) => {
    return (
      <TouchableOpacity
        onPress={navigation.toggleDrawer}
      >
        <IonIcons style={{ marginLeft: 14 }} color={params.tintColor} name={'menu'} />
      </TouchableOpacity>
    )
  },
})

const MealsAppStack = [
  {name: SCREENS.Categories , component: Categories, options: (...args) => { return { title: 'Choose the category', ...renderMenu(...args) }}},
  {name: SCREENS.Category , component: Category, options: { title: 'The Meals Category'}},
  {name: SCREENS.Favorite , component: Favorite, options: { title: 'The Meals Favorite'}},
  {name: SCREENS.MealDetail , component: MealDetail, options: { title: 'The Meal Detail'}},
]

const MealsAppFavoriteStack = [
  {name: SCREENS.Favorite , component: Favorite, options: (...args) => { return { title: 'The favorite meals', ...renderMenu(...args) }}},
  {name: SCREENS.MealDetail , component: MealDetail, options: { title: 'The Meal Detail'}},
]

const MealsAppFilterStack = [
  {name: SCREENS.Filters , component: Filters, options: (...args) => { return { title: 'The Meals Filters', ...renderMenu(...args) }}},
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

const ComponentStackNavigator = () => (
  <ComponentStack.Navigator initialRouteName={SCREENS.Components}>
    <ComponentStack.Screen name={SCREENS.Components} component={GoalsScreen} options={(...args) => { return { title: 'Components && Goals', ...renderMenu(...args) }}} />
  </ComponentStack.Navigator>
)

const GameStackNavigator = () => (
  <GameStack.Navigator initialRouteName={SCREENS.Game}>
    <GameStack.Screen name={SCREENS.Game} component={GameScreen} options={(...args) => { return { title: 'Загадай число!!!', ...renderMenu(...args) }}} />
  </GameStack.Navigator>
)

const Tab = createBottomTabNavigator(); 

const renderIcon = iconName => ({ focused, color, size }) => (<Ionicons name={iconName} size={size} color={color} />);

const MealsAppTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name={SCREENS.MealsStack} component={MealsAppStackNavigator} navigationOptions={{ headerRight: () => <BodyText>Shit</BodyText> }} options={{ title: 'Meals', tabBarIcon: renderIcon('restaurant')}} />
    <Tab.Screen name={SCREENS.FavoriteStack} component={MealsAppFavoriteStackNavigator} options={{ title: 'Favorite', tabBarIcon: renderIcon('star')}} />
    <Tab.Screen name={SCREENS.FilterStack} component={MealsAppFilterStackNavigator} options={{ title: 'Filter', tabBarIcon: renderIcon('settings') }} />
  </Tab.Navigator>
)

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={SCREENS.Home}>
        <Drawer.Screen name={SCREENS.Goals} component={ComponentStackNavigator} options={{ title: 'Components && Goals'}} />
        <Drawer.Screen name={SCREENS.Home} component={MealsAppTabNavigator} options={{ title: 'Meals app' }} />
        <Drawer.Screen name={SCREENS.Game} component={GameStackNavigator} options={{ title: 'Suggest number game' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;