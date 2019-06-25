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
import NavigationService from './src/utils/NavigationService';
import configureStore from './src/config/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Spinner } from './src/widgets/Spinner';
import Toast from 'react-native-easy-toast';
import AppToast from './src/widgets/Toast';
import scaling from './src/config/device/normalize';

const { widthScale, heightScale, moderateScale } = scaling
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rehydrated: false,
            store: null,
            persistor: null,
        };
    }

    async componentDidMount() {
        const { store, persistor } = await configureStore();
        this.setState({ store, persistor, rehydrated: true });
    }

    saveNavigationRef = (ref) => {
        const navigationService = new NavigationService();
        navigationService.setNavigationRef(ref);
    }

    setToastRef = (ref) => {
        let appToast = new AppToast();
        appToast.setToastRef(ref);
    }

    render() {
        const Router = createAppContainer(createNavigator());
        const { store, persistor, rehydrated } = this.state;
        if (!rehydrated) return <Spinner />;
        return (
            <Provider store={store}>
                <PersistGate loading={<Spinner />} persistor={persistor}>
                    <Router ref={this.saveNavigationRef} />
                    <Toast ref={this.setToastRef} fadeInDuration={1000} fadeOutDuration={1000} />
                </PersistGate>
            </Provider>
        );
    }
}
// const App = createAppContainer(createNavigator())
// export default App
