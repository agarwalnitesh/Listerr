import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '../../Home';
import Friends from '../../Friends';
import Chat from '../../Chat'
import SideMenuNavigator from './AppSideMenu'

function createNavigator(isLoggedIn = false) {
  // Stack when user is authenticated
  const AuthStack = createStackNavigator(
    {
      Home: { screen: Home },
      Friends: { screen: Friends },
      AppScreens:  { screen: ({ navigation }) => <SideMenuNavigator screenProps={navigation} /> }
    },
    {
      initialRouteName: "Home",
      headerMode:'none',
      defaultNavigationOptions: {
        headerTintColor: 'red',
        headerStyle: {
          backgroundColor: 'yellow'
        }
      }
    }
  );

  return AuthStack;
}

export default createNavigator;
