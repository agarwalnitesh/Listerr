import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';

export default class FBLogin extends Component {
    //Create response callback.
    _responseInfoCallback = (error, result) => {
        if (error) {
            console.log('Error fetching data: ', error.toString());
        } else {
            console.log('Result Name: ', result," ",result.name," ",result.picture);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        const infoRequest = new GraphRequest(
                                            '/me?fields=name,picture',
                                            null,
                                            this._responseInfoCallback
                                        );
                                        // Start the graph request.
                                        new GraphRequestManager().addRequest(infoRequest).start();
                                        // console.log(data)
                                        // this.props.navigation.navigate('AppScreens')
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")} />
            </View>
        );
    }
}