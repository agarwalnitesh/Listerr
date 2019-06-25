import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from '../../Login_Screen/LoginScreen';
import Friends from '../../Friends';
import Chat from '../../Chat';
import PhoneAuth from '../../Phone_Auth/PhoneAuth';
import FBLogin from '../../FBLogin';
import GoogleLogin from '../../GoogleLogin'
import SideMenuNavigator from './AppSideMenu'
import SignupScreen from '../../Signup_Screen/SignupScreen';
import VerifyOtp from '../../Signup_Screen/VerifyOtpScreen'

function createNavigator(isLoggedIn = false) {
  // Stack when user is authenticated
  const AuthStack = createStackNavigator(
    {
      LoginScreen: {
        screen: LoginScreen, navigationOptions: {
          header: null
        }
      },
      Friends: { screen: Friends },
      AppScreens: {
        screen: ({ navigation }) => <SideMenuNavigator screenProps={navigation} />, navigationOptions: {
          header: null
        }
      },
      PhoneAuth: { screen: PhoneAuth },
      FBLogin: { screen: FBLogin },
      GoogleLogin: { screen: GoogleLogin },
      SignupScreen: { screen: SignupScreen },
      VerifyOtp: { screen: VerifyOtp }
    },
    {
      initialRouteName: "LoginScreen",
      // headerMode: 'none',
      defaultNavigationOptions: {
        headerTintColor: 'red',
      }
    }
  );

  return AuthStack;
}

export default createNavigator;
