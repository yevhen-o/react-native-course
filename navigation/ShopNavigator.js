import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cart from 'screens/shop/Cart';
import Orders from 'screens/shop/Orders';
import Product from 'screens/shop/Product';
import ProductsList from 'screens/shop/ProductsList';
import UserProducts from 'screens/shop/UserProducts';
import AddEditProduct from 'screens/shop/AddEditProduct';

import IonIcons from 'components/IonIcons';

const ShopStack = createStackNavigator();
const AdminShopStack = createStackNavigator();
const OrdersShopStack = createStackNavigator();

import SCREENS from 'navigation/Screens';
import { COLORS } from 'common/constants';
import { useSelector } from 'react-redux';

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
    name: SCREENS.ShopProductsList,
    component: ProductsList,
    options: (...args) => {
      return { title: 'All Products', ...renderMenu(...args) };
    },
  },
  {
    name: SCREENS.ShopProduct,
    component: Product,
    options: { title: 'Some product title' },
  },
  {
    name: SCREENS.ShopCart,
    component: Cart,
    options: { title: 'Your cart' },
  },
];

const ShopOrdersStack = [
  {
    name: SCREENS.ShopOrders,
    component: Orders,
    options: (...args) => {
      return { title: 'Orders', ...renderMenu(...args) };
    },
  },
  {
    name: SCREENS.ShopProduct,
    component: Product,
    options: { title: 'Product title' },
  },
];

const ShopAdminStack = [
  {
    name: SCREENS.ShopProductsList,
    component: UserProducts,
    options: (...args) => {
      return { title: 'Your products', ...renderMenu(...args) };
    },
  },
  {
    name: SCREENS.ShopProduct,
    component: Product,
    options: { title: 'Product title' },
  },
  {
    name: SCREENS.ShopEditProduct,
    component: AddEditProduct,
    options: { title: 'Product title' },
  },
];

const defaultProductScreenOptions = (nav) => ({
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
  headerRight: function addToFavorite(props) {
    const hasCartItems = useSelector(
      (state) => Object.keys(state.shop.cart.items).length,
    );
    if (!hasCartItems) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          nav.navigation.navigate(SCREENS.ShopCart);
        }}>
        <IonIcons
          style={{ marginRight: 10 }}
          color={props.tintColor}
          name={'cart'}
        />
      </TouchableOpacity>
    );
  },
});

const ShopProductsNavigator = () => (
  <ShopStack.Navigator
    initialRouteName={SCREENS.ShopProductsList}
    screenOptions={defaultProductScreenOptions}>
    {ShopProducts.map((row) => (
      <ShopStack.Screen key={row.name} {...row} />
    ))}
  </ShopStack.Navigator>
);

const ShopOrdersStackNavigator = () => (
  <OrdersShopStack.Navigator initialRouteName={SCREENS.Favorite}>
    {ShopOrdersStack.map((row) => (
      <OrdersShopStack.Screen key={row.name} {...row} />
    ))}
  </OrdersShopStack.Navigator>
);

const AdminShopStackNavigator = () => (
  <AdminShopStack.Navigator initialRouteName={SCREENS.Favorite}>
    {ShopAdminStack.map((row) => (
      <AdminShopStack.Screen key={row.name} {...row} />
    ))}
  </AdminShopStack.Navigator>
);

const Tab = createBottomTabNavigator();

const renderIcon = (iconName) =>
  function addIcon({ color, size }) {
    return <IonIcons name={iconName} size={size} color={color} />;
  };

const ShopTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={SCREENS.ShopProductsList}
      component={ShopProductsNavigator}
      options={{ title: 'Products', tabBarIcon: renderIcon('baseball') }}
    />
    <Tab.Screen
      name={SCREENS.ShopOrders}
      component={ShopOrdersStackNavigator}
      options={{ title: 'Orders', tabBarIcon: renderIcon('briefcase') }}
    />
    <Tab.Screen
      name={SCREENS.ShopUserProducts}
      component={AdminShopStackNavigator}
      options={{ title: 'Admin', tabBarIcon: renderIcon('settings') }}
    />
  </Tab.Navigator>
);

export default ShopTabNavigator;
