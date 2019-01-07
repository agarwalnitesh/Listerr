import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';
import normalize from './config/device/normalize'

const { widthScale, heightScale } = normalize
class Friends extends Component {
    render() {
        return (
            <View style={styles.container}>
            <StatusBar
                    barStyle="light-content"
                    backgroundColor="yellow"
                />
                <Text style={styles.welcome}>Add your Friends!</Text>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("AppScreens")}
                style={{ paddingHorizontal: widthScale(10), paddingVertical: heightScale(10), backgroundColor: 'black' }}>
                    <Text style={{ color: 'white' }}>{"Add"}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default Friends