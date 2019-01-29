import React from "react";
import { View, Dimensions, PixelRatio, Platform } from "react-native";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import SideMenu from '../../SideMenu';
import scaling from '../device/normalize';
import Friends from '../../Friends';
import Chat from '../../Chat';
import List from '../../List';

const { width, height } = Dimensions.get('screen');
import AppTabNavigator from './AppTabStack'

const { widthScale, normalize, heightscale } = scaling


const SideMenuNavigator = createDrawerNavigator(
    {
        Root: { screen: AppTabNavigator },
        Chat: { screen: Chat },
        List: { screen: List }

    },
    {
        drawerWidth: width - widthScale(125),
        initialRouteName: "Root",
        contentComponent: SideMenu
    }
);

// const GetSideMenu = (props) => {

//     return (
//       <View style={{ flex: 1 }}>
//         <SideMenuNavigator
//           screenProps={props.screenProps}
//         />
//       </View>
//     );
//   }


//   GetSideMenu.router = SideMenuNavigator.router;

//   export default GetSideMenu;

export default createAppContainer(SideMenuNavigator)