import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, TextInput, Platform } from 'react-native';
import scaling from '../config/device/normalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Assets/colors';
import ListerIcon from '../ListerIcon';
import fonts from '../../Assets/fonts';
import PhoneInput from 'react-native-phone-input';
import firebase from 'react-native-firebase';
import { sendCodeAction } from './ducks/SignupScreen.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppToast from '../widgets/Toast'
import { Spinner } from '../widgets/Spinner';
import { RadioButton } from '../widgets/Radiobutton'


const { widthScale, heightScale, normalize, moderateScale } = scaling
class SignupScreen extends Component {

    state = {
        Username: '',
        Email: '',
        Phone: '',
        Password: '',
        ConfirmPassword: '',
        userInfo: null,
        error: null,
        user: null,
        confirmResult: null,
        message: '',
        selectedIndex: true
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Sign Up',
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
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    confirmResult: null,
                });
            }
        });
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

    signUp = () => {
        const { Phone } = this.state;
        this.props.actions.sendCodeAction(true)
        firebase.auth().signInWithPhoneNumber(`${this.phone.state.formattedNumber}` + Phone)
            .then(confirmResult => {
                this.props.actions.sendCodeAction(false)
                // this.setState({ confirmResult })
                this.props.navigation.navigate('VerifyOtp', {
                    'confirmResult': confirmResult,
                    data: this.state
                })
            })
            .catch(error => {
                this.props.actions.sendCodeAction(false)
                AppToast.toastRef.show(`otp sent error ${error.message}`)
                console.log("otp sent error", error)
                this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
            });
    };

    renderSignUpField = () => {
        return (
            <View>
                <TextInput
                    placeholder={'Name'}
                    placeholderTextColor={colors.Placeholder_Color}
                    value={this.state.Username}
                    onChangeText={Username => { this.setState({ Username }) }}
                    style={styles.TextInputStyle} />
                <View style={[styles.TextInputStyle, { flexDirection: 'row', paddingVertical: heightScale(0) }]}>
                    <PhoneInput ref={(ref) => { this.phone = ref; }} style={{ flex: 0.3 }} textStyle={{ fontWeight: 'bold', fontSize: normalize(15), color: 'grey' }} />
                    <TextInput
                        placeholder={'Phone. No.'}
                        placeholderTextColor={colors.Placeholder_Color}
                        value={this.state.Phone}
                        keyboardType='phone-pad'
                        onChangeText={Phone => { this.setState({ Phone }) }}
                        style={{ flex: 0.7, fontWeight: 'bold', fontSize: normalize(15), color: 'grey' }}
                    />
                </View >
                <TextInput
                    placeholder={'Email Id'}
                    keyboardType='email-address'
                    placeholderTextColor={colors.Placeholder_Color}
                    value={this.state.Email}
                    onChangeText={Email => { this.setState({ Email }) }}
                    style={styles.TextInputStyle} />

                <TextInput
                    placeholder={'Password'}
                    placeholderTextColor={colors.Placeholder_Color}
                    value={this.state.Password}
                    onChangeText={Password => { this.setState({ Password }) }}
                    secureTextEntry
                    style={styles.TextInputStyle} />
                <TextInput
                    placeholder={'Confirm Password'}
                    placeholderTextColor={colors.Placeholder_Color}
                    value={this.state.ConfirmPassword}
                    onChangeText={ConfirmPassword => { this.setState({ ConfirmPassword }) }}
                    secureTextEntry
                    style={styles.TextInputStyle} />

            </View>

        )
    }

    renderRadioButton = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <RadioButton
                    disabled={this.state.selectedIndex}
                    TitleText={"Customer"}
                    radioButtonPressed={() => {
                        this.setState({ selectedIndex: true })
                    }}
                    additionalTextStyle={styles.RadioButtonTextStyle}
                    key={1}
                />
                <RadioButton
                    disabled={!this.state.selectedIndex}
                    TitleText={"Bussiness"}
                    radioButtonPressed={() => {
                        this.setState({ selectedIndex: false })
                    }}
                    additionalTextStyle={styles.RadioButtonTextStyle}
                    key={2}
                />

            </View>
        )
    }

    render() {
        const { loading } = this.props.SignupReducer
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <View style={{ flex: 1, paddingTop: heightScale(10), paddingHorizontal: widthScale(20), }}>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            {this.renderRadioButton()}
                            {this.renderSignUpField()}
                            <View style={{ marginTop: heightScale(20), alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.signUp()
                                    }
                                    }
                                    style={{ backgroundColor: '#ff3333', borderRadius: widthScale(30), flexDirection: 'row', paddingHorizontal: widthScale(10) }}>
                                    <Text style={{ textAlign: 'center', marginHorizontal: widthScale(10), fontSize: normalize(20), color: 'white', marginVertical: heightScale(10) }}>Sign Up</Text>
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
    },
    RadioButtonTextStyle: {
        paddingLeft: widthScale(10),
        fontSize: normalize(16),
        color: '#ff6666',
        fontWeight: '500'
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)