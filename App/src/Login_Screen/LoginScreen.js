import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import scaling from '../config/device/normalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Assets/colors';
import ListerIcon from '../ListerIcon';
import fonts from '../../Assets/fonts';
import firebase from 'react-native-firebase';
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const { widthScale, heightScale, normalize } = scaling
class LoginScreen extends Component {

    state = {
        Username: ''
    }

    renderIcon = (size) => {
        return (
            <Icon
                type="AntDesign"
                name="gitlab"
                size={size}
                color="red"
                style={{ alignSelf: 'center' }}
            />
        )
    }
    //Create response callback.
    _responseInfoCallback = (error, result) => {
        if (error) {
            console.log('Error fetching data: ', error.toString());
        } else {
            this.setState({ Username:result.name })
            console.log('Result Name: ', result, " ", result.name, " ", result.picture);
        }
    }

    renderFbLogin = () => {
        let self = this
        LoginManager.logInWithReadPermissions(["public_profile","email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: ",
                        result
                    );
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const infoRequest = new GraphRequest(
                                '/me?fields=name,picture,email',
                                null,
                                self._responseInfoCallback
                            );
                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start();
                            console.log("data", data)
                            // this.props.navigation.navigate('AppScreens')
                        }
                    )
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }
    render() {
        console.log("firebase: ", LoginButton);

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor={colors.Red_Backgroud}
                />
                <ScrollView >
                    <View style={{ flex: 0.3, backgroundColor: colors.Red_Backgroud, alignItems: 'center' }}>
                        <View style={{ elevation: 2, width: widthScale(100), bottom: -50, backgroundColor: '#ccccb3', borderRadius: widthScale(15), paddingVertical: heightScale(10) }}>
                            {/* {this.renderIcon(80)} */}
                            <ListerIcon size={80} />
                            <Text style={[styles.iconTextStyle, { fontSize: normalize(25) }]}>Listerr</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.7, paddingTop: heightScale(80), paddingHorizontal: widthScale(40), }}>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <TextInput
                                placeholder={'Username  / Phone. No.'}
                                placeholderTextColor={'#ff6666'}
                                value={this.state.Username}
                                onChangeText={Username => { this.setState({ Username }) }}
                                style={styles.TextInputStyle} />

                            <TextInput
                                placeholder={'Password'}
                                placeholderTextColor={'#ff6666'}
                                secureTextEntry
                                style={styles.TextInputStyle} />
                        </KeyboardAvoidingView>


                        <View style={{ marginTop: heightScale(20), alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AppScreens')
                                }
                                style={{ backgroundColor: '#ff3333', borderRadius: widthScale(30), flexDirection: 'row', paddingHorizontal: widthScale(10) }}>
                                <Text style={{ textAlign: 'center', marginHorizontal: widthScale(10), fontSize: normalize(20), color: 'white', marginVertical: heightScale(10) }}>Open</Text>
                                <View style={{ backgroundColor: 'white', marginVertical: heightScale(10), marginRight: widthScale(10), justifyContent: 'center', borderRadius: widthScale(5), paddingHorizontal: widthScale(5) }}>
                                    {/* {this.renderIcon(25)} */}
                                    <ListerIcon size={25} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: heightScale(20) }}>
                                <Text style={styles.messageText}>Or open  </Text>
                                {this.renderIcon(25)}
                                <Text style={styles.messageText}>  using</Text>
                            </View>
                            <View style={{ marginTop: heightScale(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={this.renderFbLogin} //{()=>this.props.navigation.navigate('FBLogin')}
                                >
                                    <Icon
                                        type="AntDesign"
                                        name="facebook-square"
                                        size={50}
                                        color="blue"
                                        style={{ alignSelf: 'center', marginRight: widthScale(30) }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>{this.setState({Username:''}),LoginManager.logOut()}} // currently this is user to logout the fb account
                                >
                                    <Icon
                                        type="FontAwesome"
                                        name="google-plus-circle"
                                        size={50}
                                        color="red"
                                        style={{ alignSelf: 'center', marginRight: widthScale(10) }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('PhoneAuth')}
                                style={{ backgroundColor: '#ff3333', borderRadius: widthScale(30), flexDirection: 'row', paddingHorizontal: widthScale(10), marginVertical: heightScale(20) }}>
                                <Text style={{ textAlign: 'center', marginHorizontal: widthScale(10), fontSize: normalize(20), color: 'white', marginVertical: heightScale(10) }}>Sign Up</Text>
                                <View style={{ backgroundColor: 'white', marginVertical: heightScale(10), marginRight: widthScale(10), justifyContent: 'center', borderRadius: widthScale(5), paddingHorizontal: widthScale(5) }}>
                                    {/* {this.renderIcon(25)} */}
                                    <ListerIcon size={25} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>


            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Theme_Color,
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
    iconTextStyle: {
        fontSize: normalize(60),
        color: '#ff3333',
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    TextInputStyle: {
        backgroundColor: 'white',
        borderRadius: widthScale(50),
        paddingHorizontal: widthScale(15),
        marginTop: heightScale(20),
        fontWeight: 'bold',
        fontSize: normalize(15),
        color: 'grey'
    },
    messageText: {
        fontSize: normalize(22),
        color: '#ff3333',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.CharmRegular
    }
});

export default LoginScreen