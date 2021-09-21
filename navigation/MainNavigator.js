import React from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SCREENS from 'navigation/Screens';

import Filters from 'screens/meals/Filters';
import GameScreen from 'screens/GameScreen';
import GoalsScreen from 'screens/GoalsScreen';
import Category from 'screens/meals/Category';
import Favorite from 'screens/meals/Favorite';
import Categories from 'screens/meals/Categories';
import MealDetail from 'screens/meals/MealDetail';
import Headings from 'screens/Components/TextComponents';
import Buttons from 'screens/Components/Buttons';
import FormElements from 'screens/Components/FormElements';
import ShopTabNavigator from './ShopNavigator';
import GratePlaceTabNavigator from './GratePlaceTabNavigator';
import IonIcons from 'components/IonIcons';
import { logOutUser } from 'redux/actions/shopActions';

const MealsStack = createStackNavigator();
const FilterMealsStack = createStackNavigator();
const FavoriteMealsStack = createStackNavigator();

const GameStack = createStackNavigator();
const GoalsStack = createStackNavigator();

const renderMenu = ({ navigation }) => ({
  headerLeft: function addMenuBtn(params) {
    return (
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <IonIcons
          style={{ marginLeft: 14 }}
          color={params.tintColor}
          name={'menu'}
        />
      </TouchableOpacity>
    );
  },
});

const MealsAppStack = [
  {
    name: SCREENS.Categories,
    component: Categories,
    options: (...args) => {
      return { title: 'Choose the category', ...renderMenu(...args) };
    },
  },
  {
    name: SCREENS.Category,
    component: Category,
    options: { title: 'The Meals Category' },
  },
  {
    name: SCREENS.Favorite,
    component: Favorite,
    options: { title: 'The Meals Favorite' },
  },
  {
    name: SCREENS.MealDetail,
    component: MealDetail,
    options: { title: 'The Meal Detail' },
  },
];

const MealsAppFavoriteStack = [
  {
    name: SCREENS.Favorite,
    component: Favorite,
    options: (...args) => {
      return { title: 'The favorite meals', ...renderMenu(...args) };
    },
  },
  {
    name: SCREENS.MealDetail,
    component: MealDetail,
    options: { title: 'The Meal Detail' },
  },
];

const MealsAppFilterStack = [
  {
    name: SCREENS.Filters,
    component: Filters,
    options: (...args) => {
      return { title: 'The Meals Filters', ...renderMenu(...args) };
    },
  },
  {
    name: SCREENS.Category,
    component: Category,
    options: { title: 'The Meals Category' },
  },
  {
    name: SCREENS.MealDetail,
    component: MealDetail,
    options: { title: 'The Meal Detail' },
  },
  {
    name: SCREENS.Categories,
    component: Categories,
    options: { title: 'The Meals Categories' },
  },
];

const MealsAppStackNavigator = () => (
  <MealsStack.Navigator initialRouteName={SCREENS.Categories}>
    {MealsAppStack.map((row) => (
      <MealsStack.Screen key={row.name} {...row} />
    ))}
  </MealsStack.Navigator>
);

const MealsAppFavoriteStackNavigator = () => (
  <FavoriteMealsStack.Navigator initialRouteName={SCREENS.Favorite}>
    {MealsAppFavoriteStack.map((row) => (
      <FavoriteMealsStack.Screen key={row.name} {...row} />
    ))}
  </FavoriteMealsStack.Navigator>
);

const MealsAppFilterStackNavigator = () => (
  <FilterMealsStack.Navigator initialRouteName={SCREENS.Favorite}>
    {MealsAppFilterStack.map((row) => (
      <FilterMealsStack.Screen key={row.name} {...row} />
    ))}
  </FilterMealsStack.Navigator>
);

const GoalsStackNavigator = () => (
  <GoalsStack.Navigator initialRouteName={SCREENS.Components}>
    <GoalsStack.Screen
      name={SCREENS.Components}
      component={GoalsScreen}
      options={(...args) => {
        return { title: 'Goals app', ...renderMenu(...args) };
      }}
    />
  </GoalsStack.Navigator>
);

const GameStackNavigator = () => (
  <GameStack.Navigator initialRouteName={SCREENS.Game}>
    <GameStack.Screen
      name={SCREENS.Game}
      component={GameScreen}
      options={(...args) => {
        return { title: 'Загадай число!!!', ...renderMenu(...args) };
      }}
    />
  </GameStack.Navigator>
);

const Tab = createBottomTabNavigator();
const ComponentsTab = createBottomTabNavigator();

const renderIcon = (iconName) =>
  function addIcon({ color, size }) {
    return <Ionicons name={iconName} size={size} color={color} />;
  };

const MealsAppTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={SCREENS.MealsStack}
      component={MealsAppStackNavigator}
      options={{ title: 'Meals', tabBarIcon: renderIcon('restaurant') }}
    />
    <Tab.Screen
      name={SCREENS.FavoriteStack}
      component={MealsAppFavoriteStackNavigator}
      options={{ title: 'Favorite', tabBarIcon: renderIcon('star') }}
    />
    <Tab.Screen
      name={SCREENS.FilterStack}
      component={MealsAppFilterStackNavigator}
      options={{ title: 'Filter', tabBarIcon: renderIcon('settings') }}
    />
  </Tab.Navigator>
);

const ComponentsAppTabNavigator = () => (
  <ComponentsTab.Navigator>
    <ComponentsTab.Screen
      name={SCREENS.Headings}
      component={Headings}
      options={{
        title: 'Headings',
        tabBarIcon: renderIcon('document-text-outline'),
      }}
    />
    <ComponentsTab.Screen
      name={SCREENS.Buttons}
      component={Buttons}
      options={{
        title: 'Buttons',
        tabBarIcon: renderIcon('game-controller-outline'),
      }}
    />
    <ComponentsTab.Screen
      name={SCREENS.FormElements}
      component={FormElements}
      options={{
        title: 'Forms',
        tabBarIcon: renderIcon('exit-outline'),
      }}
    />
  </ComponentsTab.Navigator>
);

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={SCREENS.GratePlace}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Logout"
                icon={renderIcon('log-out')}
                onPress={() => {
                  dispatch(logOutUser());
                  props.navigation.toggleDrawer();
                }}
              />
            </DrawerContentScrollView>
          );
        }}>
        <Drawer.Screen
          name={SCREENS.Goals}
          component={GoalsStackNavigator}
          options={{ title: 'Goals App' }}
        />
        <Drawer.Screen
          name={SCREENS.Components}
          component={ComponentsAppTabNavigator}
          options={{ title: 'Components' }}
        />
        <Drawer.Screen
          name={SCREENS.Home}
          component={MealsAppTabNavigator}
          options={{ title: 'Meals app' }}
        />
        <Drawer.Screen
          name={SCREENS.Game}
          component={GameStackNavigator}
          options={{ title: 'Suggest number game' }}
        />
        <Drawer.Screen
          name={SCREENS.Shop}
          component={ShopTabNavigator}
          options={{ title: 'The Shop App' }}
        />
        <Drawer.Screen
          name={SCREENS.GratePlace}
          component={GratePlaceTabNavigator}
          options={{ title: 'The Grate Place App' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
