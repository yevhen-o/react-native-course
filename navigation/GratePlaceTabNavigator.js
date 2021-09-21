import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from 'screens/shop/AuthScreen';
import PlacesList from 'screens/GratePlace/PlacesList';
import AddEditPlace from 'screens/GratePlace/AddEditPlace';
import PlaceMap from 'screens/GratePlace/Map';

import IonIcons from 'components/IonIcons';

const ShopStack = createStackNavigator();

import SCREENS from 'navigation/Screens';
import { COLORS } from 'common/constants';
import { useSelector } from 'react-redux';
import PlaceDetail from 'screens/GratePlace/PlaceDetail';

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

const ShopProducts = [
  {
    name: SCREENS.GratePlace,
    component: PlacesList,
    options: (...args) => {
      return { title: 'Grate Places', ...renderMenu(...args) };
    },
  },
  {
    name: SCREENS.AddEditPlace,
    component: AddEditPlace,
    options: { title: 'Add new place' },
  },
  {
    name: SCREENS.PlaceDetail,
    component: PlaceDetail,
    options: { title: 'Some Place title' },
  },
  {
    name: SCREENS.PlaceMap,
    component: PlaceMap,
    options: { title: 'Choose place on map' },
  },
];

const defaultProductScreenOptions = () => ({
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: COLORS.accent,
  // headerRight: function addToFavorite(props) {
  //   const hasCartItems = useSelector(
  //     (state) => Object.keys(state.shop.cart.items).length,
  //   );
  //   if (!hasCartItems) {
  //     return null;
  //   }
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         nav.navigation.navigate(SCREENS.ShopCart);
  //       }}>
  //       <IonIcons
  //         style={{ marginRight: 10 }}
  //         color={props.tintColor}
  //         name={'cart'}
  //       />
  //     </TouchableOpacity>
  //   );
  // },
});

const GratePlaceTabNavigator = () => {
  const isUserLoggedIn = useSelector(
    (state) => state.shop.userLoginState.data.localId,
  );
  return (
    <ShopStack.Navigator
      initialRouteName={SCREENS.ShopProductsList}
      screenOptions={defaultProductScreenOptions}>
      {isUserLoggedIn ? (
        ShopProducts.map((row) => <ShopStack.Screen key={row.name} {...row} />)
      ) : (
        <ShopStack.Screen
          name={SCREENS.Login}
          component={AuthScreen}
          options={{ title: 'Authenticate' }}
        />
      )}
    </ShopStack.Navigator>
  );
};

export default GratePlaceTabNavigator;
