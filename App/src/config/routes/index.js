import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from '../../Login_Screen/LoginScreen' ;
import Friends from '../../Friends';
import Chat from '../../Chat';
import PhoneAuth from '../../Phone_Auth/PhoneAuth';
import FBLogin from '../../FBLogin';
import SideMenuNavigator from './AppSideMenu'

function createNavigator(isLoggedIn = false) {
  // Stack when user is authenticated
  const AuthStack = createStackNavigator(
    {
      LoginScreen: { screen: LoginScreen },
      Friends: { screen: Friends },
      AppScreens:  { screen: ({ navigation }) => <SideMenuNavigator screenProps={navigation} /> },
      PhoneAuth:{screen:PhoneAuth},
      FBLogin:{screen:FBLogin}
    },
    {
      initialRouteName: "LoginScreen",
      headerMode:'none',
      defaultNavigationOptions: {
        headerTintColor: 'red',
      }
    }
  );

  return AuthStack;
}

export default createNavigator;
