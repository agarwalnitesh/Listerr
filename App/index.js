/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import createNavigator from './src/config/routes/index'


export default class App extends Component {

    render() {
        const Router = createAppContainer(createNavigator());
        return (
            // <View style={styles.container}>
            <Router style={{backgroundColor:'pink'}} />
            // </View>
        );
    }
}
// const App = createAppContainer(createNavigator())
// export default App
