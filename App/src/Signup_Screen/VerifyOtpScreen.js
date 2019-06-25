import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, TextInput, Platform } from 'react-native';
import scaling from '../config/device/normalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Assets/colors';
import ListerIcon from '../ListerIcon';
import fonts from '../../Assets/fonts';
import PhoneInput from 'react-native-phone-input';
import { StackActions, NavigationActions } from 'react-navigation'
import { sendCodeAction } from './ducks/SignupScreen.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppToast from '../widgets/Toast'
import { Spinner } from '../widgets/Spinner';
import { database } from 'react-native-firebase';

const { widthScale, heightScale, normalize, moderateScale } = scaling
class VerifyOtp extends Component {

    state = {
        otp: '',
        userInfo: null,
        error: null,
    }
    constructor(props) {
        super(props);
        this.confirmResult = this.props.navigation.getParam('confirmResult', {})
        this.data = this.props.navigation.getParam('data', {})
    }
    // componentDidMount(props) {

    // }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Verify Otp',
            headerStyle: {
                backgroundColor: colors.Red_Backgroud,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    }
    componentDidMount() {
        console.log("verify data:", this.data);

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

    resetStack = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AppScreens' })]
        });
        this.props.navigation.dispatch(resetAction);
    };

    VerifyOtpPress = () => {
        const { otp } = this.state;
        const { Username, Email, Password, Phone, selectedIndex } = this.data
        // console.log("verify called", this.confirmResult)
        if (this.confirmResult && otp.length) {
            this.props.actions.sendCodeAction(true)
            this.confirmResult.confirm(otp)
                .then((user) => {
                    database().ref('users/' + Phone).set({ Email, Name: Username, Password, Phone, Type: selectedIndex ? 'Customer' : 'Business' })
                    this.props.actions.sendCodeAction(false)
                    console.log('code verified', user)
                    this.resetStack()
                    // this.props.navigation.navigate('AppScreens')
                })
                .catch(error => {
                    this.props.actions.sendCodeAction(false)
                    AppToast.toastRef.show(`Code Confirm Error: ${error.message}`)
                });
        }
        else {
            AppToast.toastRef.show('Enter valid otp')
        }
    };

    render() {
        const { loading } = this.props.SignupReducer
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <View style={{ flex: 1, paddingTop: heightScale(10), paddingHorizontal: widthScale(20), }}>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput
                                    placeholder={'Code'}
                                    placeholderTextColor={'#ff6666'}
                                    value={this.state.otp}
                                    onChangeText={otp => { this.setState({ otp }) }}
                                    style={styles.TextInputStyle} />
                            </View>

                            <View style={{ marginTop: heightScale(40), alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => this.VerifyOtpPress()
                                    }
                                    style={{ backgroundColor: '#ff3333', borderRadius: widthScale(30), flexDirection: 'row', paddingHorizontal: widthScale(10) }}>
                                    <Text style={{ textAlign: 'center', marginHorizontal: widthScale(10), fontSize: normalize(20), color: 'white', marginVertical: heightScale(10) }}>Verify</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
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
        paddingHorizontal: widthScale(10),
        paddingVertical: heightScale(10),
        marginTop: heightScale(20),
        fontWeight: 'bold',
        fontSize: normalize(18),
        color: 'grey',
        minWidth: widthScale(150),
        textAlign: 'center'
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
        actions: bindActionCreators({ sendCodeAction }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp)