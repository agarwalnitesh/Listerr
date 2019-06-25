import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, TextInput, Platform } from 'react-native';
import scaling from '../config/device/normalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Assets/colors';
import ListerIcon from '../ListerIcon';
import fonts from '../../Assets/fonts';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { StackActions, NavigationActions } from 'react-navigation'
import AppToast from '../widgets/Toast';
import { sendCodeAction, saveLoginData } from '../Signup_Screen/ducks/SignupScreen.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from '../widgets/Spinner'

const { widthScale, heightScale, normalize, moderateScale } = scaling
class LoginScreen extends Component {

    state = {
        Username: '',
        Password: '',
        userInfo: null,
        error: null,
    }
    // static navigationOption = ({ navigation }) => {
    //     return {
    //         headerMode: 'none'
    //     }
    // }
    constructor(props) {
        super(props)

    }

    async componentDidMount() {
        this._configureGoogleSignIn();
        if (Platform.OS === 'ios') {
            LoginManager.setLoginBehavior('web');
        } else if (Platform.OS === 'android') {
            LoginManager.setLoginBehavior('web_only');
        }
        // // await this._getCurrentUser();
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure();
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ Username: userInfo.user.name, userInfo, error: null });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {
                Alert.alert('Something went wrong', error.toString());
                this.setState({
                    error,
                });
            }
        }
    };

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            this.setState({ userInfo: null, error: null, Username: '' });
        } catch (error) {
            this.setState({
                error,
            });
        }
    };

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
            this.setState({ Username: result.name })
            console.log('Result Name: ', result, " ", result.name, " ", result.picture);
        }
    }

    renderFbLogin = () => {
        let self = this
        LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
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


    onLoginPress = () => {
        this.props.actions.sendCodeAction(true)
        console.log("login data", this.state.Username, " password:", this.state.Password)
        if (this.state.Username.length < 9 || this.state.Password.length < 4) {
            this.props.actions.sendCodeAction(false)
            AppToast.toastRef.show("Please Enter Valid Fields")
        }
        else {
            firebase.database().ref('users').child(this.state.Username).on("value", (value) => {
                let data = value._value
                if (data.Password === this.state.Password) {
                    this.props.actions.sendCodeAction(false)
                    this.props.actions.saveLoginData(value._value)
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'AppScreens' })]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
                else {
                    this.props.actions.sendCodeAction(false)
                    AppToast.toastRef.show("Invalid Password")
                }
            })
        }

    };
    render() {
        const { loading } = this.props.SignupReducer
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor={colors.Red_Backgroud}
                />
                <ScrollView bounces={false}>
                    <View style={{ flex: 0.3, backgroundColor: colors.Red_Backgroud, alignItems: 'center' }}>
                        <View style={{ elevation: 2, width: widthScale(100), bottom: -50, backgroundColor: '#ccccb3', borderRadius: widthScale(15), paddingVertical: heightScale(10), shadowColor: 'black', shadowOpacity: 0.2 }}>
                            {/* {this.renderIcon(80)} */}
                            <ListerIcon size={60} />
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
                                value={this.state.Password}
                                onChangeText={Password => { this.setState({ Password }) }}
                                style={styles.TextInputStyle} />
                        </KeyboardAvoidingView>


                        <View style={{ marginTop: heightScale(20), alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.onLoginPress() //this.props.navigation.navigate('AppScreens')
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
                                <TouchableOpacity
                                    onPress={() => {
                                        LoginManager.logOut();
                                        this._signOut()
                                    }}
                                >
                                    {this.renderIcon(25)}
                                </TouchableOpacity>
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
                                    onPress={this._signIn}   //{()=>{this.setState({Username:''}),LoginManager.logOut()}} // currently this is user to logout the fb account
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
                                onPress={() => this.props.navigation.navigate('SignupScreen')}
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
                {loading && <Spinner />}
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
        paddingVertical: heightScale(10),
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

function mapStateToProps({ SignupReducer }) {
    return {
        SignupReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ sendCodeAction, saveLoginData }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)