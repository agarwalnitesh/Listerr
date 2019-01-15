import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import scaling from './config/device/normalize';
import Icon from 'react-native-vector-icons/FontAwesome';

const { widthScale, heightScale, normalize } = scaling
class Home extends Component {

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
    render() {
        return (


            <View style={styles.container}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor="#ff3333"
                />
                <ScrollView >
                    <View style={{ flex: 0.3, backgroundColor: "#ff3333", alignItems: 'center' }}>
                        <View style={{ elevation: 2, width: widthScale(100), height: heightScale(100), bottom: -50, backgroundColor: '#ccccb3', borderRadius: widthScale(15), paddingVertical: heightScale(10) }}>
                            {this.renderIcon(80)}
                            <Text style={[styles.iconTextStyle, { fontSize: normalize(25) }]}>Listerr</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.7, paddingTop: heightScale(80), paddingHorizontal: widthScale(40), }}>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <TextInput
                                placeholder={'Username  / Phone. No.'}
                                placeholderTextColor={'#ff6666'}                                
                                style={styles.TextInputStyle} />

                            <TextInput
                                placeholder={'Password'}
                                placeholderTextColor={'#ff6666'}
                                secureTextEntry
                                style={styles.TextInputStyle} />
                        </KeyboardAvoidingView>


                        <View style={{ marginTop: heightScale(20), alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: '#ff3333', borderRadius: widthScale(30), flexDirection: 'row', paddingHorizontal: widthScale(10) }}>
                                <Text style={{ textAlign: 'center', marginHorizontal: widthScale(10), fontSize: normalize(20), color: 'white', marginVertical: heightScale(10) }}>Open</Text>
                                <View style={{ backgroundColor: 'white', marginVertical: heightScale(10), marginRight: widthScale(10), justifyContent: 'center',borderRadius:widthScale(5),paddingHorizontal:widthScale(5) }}>
                                    {this.renderIcon(25)}
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: heightScale(20) }}>
                                <Text style={styles.messageText}>Or open  </Text>
                                {this.renderIcon(25)}
                                <Text style={styles.messageText}>  using</Text>
                            </View>
                            <View style={{ marginTop: heightScale(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity>
                                    <Icon
                                        type="AntDesign"
                                        name="facebook-square"
                                        size={50}
                                        color="red"
                                        style={{ alignSelf: 'center', marginRight: widthScale(30) }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon
                                        type="FontAwesome"
                                        name="google-plus-circle"
                                        size={50}
                                        color="red"
                                        style={{ alignSelf: 'center', marginRight: widthScale(10) }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#ff3333', borderRadius: widthScale(30), flexDirection: 'row', paddingHorizontal: widthScale(10),marginVertical:heightScale(20) }}>
                                <Text style={{ textAlign: 'center', marginHorizontal: widthScale(10), fontSize: normalize(20), color: 'white', marginVertical: heightScale(10) }}>Sign Up</Text>
                                <View style={{ backgroundColor: 'white', marginVertical: heightScale(10), marginRight: widthScale(10), justifyContent: 'center',borderRadius:widthScale(5),paddingHorizontal:widthScale(5) }}>
                                    {this.renderIcon(25)}
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
        backgroundColor: '#ccccb3',
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
    }
});

export default Home