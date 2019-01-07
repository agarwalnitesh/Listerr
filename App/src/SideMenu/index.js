import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import scaling from '../config/device/normalize';

const { widthScale, heightScale, normalize } = scaling


class SideMenu extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{ marginHorizontal: widthScale(5), paddingBottom: heightScale(20) }}>
                    <Text style={{ fontSize: normalize(18), fontWeight: 'bold', color: 'red', textAlign: 'center', paddingBottom: heightScale(20) }}>Hi Nitesh</Text>
                    <ScrollView>
                        <TouchableOpacity onPress={
                            () => this.props.navigation.navigate("List")
                        }>
                            <View style={styles.ViewStyle}>
                                <Text style={styles.itemTextStyle}>Your Subscriptions</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={
                            () => this.props.navigation.navigate("Chat")
                        }>
                            <View style={styles.ViewStyle}>
                                <Text style={styles.itemTextStyle}>Notifications</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={
                            () => this.props.navigation.navigate("List")
                        }>
                            <View style={styles.ViewStyle}>
                                <Text style={styles.itemTextStyle}>Your Credits</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={
                            () => this.props.navigation.navigate("Chat")
                        }>
                            <View style={styles.ViewStyle}>
                                <Text style={styles.itemTextStyle}>Your Cart</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={
                            () => this.props.navigation.navigate("Tab1")
                        }>
                            <View style={styles.ViewStyle}>
                                <Text style={[styles.itemTextStyle,{color:'red',fontWeight:'bold'}]}>Go Back!!</Text>
                            </View>
                        </TouchableOpacity>


                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ViewStyle: {
        flexDirection: 'row',
        height: heightScale(42),
        alignItems: 'flex-start'
    },
    itemTextStyle: {
        marginHorizontal: widthScale(20),
        color: 'black',
        fontSize: normalize(16)
    }
})

export default SideMenu