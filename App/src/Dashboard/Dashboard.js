import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import normalize from '../config/device/normalize'
import Header from '../widgets/Header'
import colors from '../../Assets/colors';
const { widthScale, heightScale } = normalize
class Dashboard extends Component {
    // static navigationOptions = () => {
    //     return {
    //         header: null
    //     }
    // }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor={colors.Red_Backgroud}
                />
                <Header onMenuPressed={() => this.props.navigation.toggleDrawer()} />
                <View style={styles.container}>

                    <Text style={styles.welcome}>Tab1!</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{ paddingHorizontal: widthScale(10), paddingVertical: heightScale(10), backgroundColor: 'black' }}>
                        <Text style={{ color: 'white' }}>{"Add"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.Theme_Color,
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

export default Dashboard