import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import scaling from '../config/device/normalize';
import { ic_sideMenu } from '../../Assets/Images/SideMenu';
import ListerIcon from '../ListerIcon';
import { StackActions, NavigationActions } from 'react-navigation'
import NavigationService from '../utils/NavigationService'


const { widthScale, heightScale, normalize } = scaling
const { width, height } = Dimensions.get('screen');

class SideMenu extends React.Component {
    logoutAndNavigate = () => {
        console.log("Logout Pressed")

        const navigationRef = NavigationService.navigationRef;
        try {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })]
            });
            navigationRef.dispatch(resetAction);
        } catch (err) {

        }
    };
    render() {
        return (
            <View style={{ flex: 1 }}>

                <View>
                    <Image source={ic_sideMenu}
                        resizeMode={'stretch'}
                        style={{ width: width - widthScale(125), height: heightScale(180) }}
                    />
                    {/* <View style={{ width: widthScale(50), height: heightScale(60), position: 'absolute', top: 120, left: 20, backgroundColor: 'grey',justifyContent:'center',borderRadius:widthScale(20) }}>
                    <Text style={{textAlign:'center',fontSize:normalize(28),fontWeight:'bold',fontStyle:'italic',color:'red'}}>Li!</Text>
                    </View> */}
                    <View style={{ elevation: 2, height: heightScale(80), position: 'absolute', top: heightScale(140), left: 20, backgroundColor: '#ccccb3', borderRadius: widthScale(15), paddingVertical: heightScale(10), paddingHorizontal: widthScale(10) }}>
                        {/* {this.renderIcon(80)} */}
                        <ListerIcon size={25} />
                        <Text style={[styles.iconTextStyle, { fontSize: normalize(15) }]}>Listerr</Text>
                    </View>
                    <Text style={{ fontSize: normalize(20), fontWeight: 'bold', color: 'red', position: 'absolute', top: heightScale(185), left: widthScale(100) }}>Hi Nitesh</Text>
                </View>
                <View
                    style={{ marginHorizontal: widthScale(5), paddingBottom: heightScale(20), marginTop: heightScale(40) }}>
                    {/* <Text style={{ fontSize: normalize(18), fontWeight: 'bold', color: 'red', textAlign: 'center', paddingBottom: heightScale(20) }}>Hi Nitesh</Text> */}
                    <ScrollView
                        contentContainerStyle={{ marginBottom: heightScale(30), marginTop: heightScale(20) }}
                    >
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
                            () => this.logoutAndNavigate()
                        }>
                            <View style={styles.ViewStyle}>
                                <Text style={[styles.itemTextStyle, { color: 'red', fontWeight: 'bold' }]}>Go Back!!</Text>
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
    },

    iconTextStyle: {
        fontSize: normalize(60),
        color: '#ff3333',
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic'
    },
})

export default SideMenu