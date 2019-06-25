import { createStackNavigator, createBottomTabNavigator, StackActions } from 'react-navigation';
import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Scaling from '../device/normalize';
import Dashboard from '../../Dashboard/Dashboard';
import Tab2 from '../../Tab2'

const { heightScale, widthScale, normalize } = Scaling;

// Each tab has its own Stack navigator
const AppTabNavigator = createBottomTabNavigator({
    Dashboard: {
        screen: createStackNavigator({
            Dashboard: {
                screen: Dashboard,
                navigationOptions: {
                    header: null
                }
            }
        }),
        navigationOptions: ({ navigation }) => ({
            tabBarButtonComponent: () => (
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.tabStyle, navigation.isFocused() && styles.activeBackground]}
                    onPress={() => {
                        navigation.dispatch(StackActions.popToTop());
                        navigation.navigate('Dashboard')
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.tabTextStyle, { fontSize: normalize(15), textAlign: 'center' }]}>{'Tab1'}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    },
    Tab2: {
        screen: createStackNavigator({
            Tab2: {
                screen: Tab2, navigationOptions: {
                    header: null
                }
            }
        }),
        navigationOptions: ({ navigation }) => ({
            tabBarButtonComponent: () => (
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.tabStyle, navigation.isFocused() && styles.activeBackground]}
                    onPress={() => {
                        navigation.dispatch(StackActions.popToTop());
                        navigation.navigate('Tab2')
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.tabTextStyle, { fontSize: normalize(15), textAlign: 'center' }]}>{'Tab2'}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }
}, {
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: 'grey',
                height: heightScale(4)
            },
            style: {
                backgroundColor: 'red',
                height: heightScale(60),
                // borderTopWidth: 1,
                // borderTopColor: 'blue',
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                justifyContent: 'center'
            }
        },
        initialRouteName: 'Dashboard',
    });

const styles = StyleSheet.create({
    tabStyle: {
        justifyContent: 'center',
        flex: 0.25
    },
    tabIconStyle: {
        height: heightScale(30),
        width: widthScale(30)
    },
    activeBackground: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    tabTextStyle: {
        marginTop: heightScale(4),
        fontSize: normalize(12),
        color: 'white'
    }
});

export default AppTabNavigator;