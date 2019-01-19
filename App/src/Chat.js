import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import normalize from './config/device/normalize'

const { widthScale, heightScale } = normalize
class Chat extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Chat Here</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.toggleDrawer()}
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

export default Chat