import React from 'react';
import {
    StyleSheet, View, TouchableOpacity, Text
} from 'react-native';
import Scaling from '../../config/device/normalize';
import Icon from 'react-native-vector-icons/FontAwesome';

const { heightScale, widthScale, normalize, moderateScale } = Scaling;


const RadioButton = props => {

    return (
        <TouchableOpacity
            style={[{ flexDirection: 'column' }, props.touchStyle]}
            onPress={() => props.radioButtonPressed()}
            activeOpacity={0.5}
            disabled={props.touchDisabled}
        >
            <View style={{ flexDirection: 'row' }}>
                {/* <Image
                    style={{
                        width: widthScale(20),
                        height: heightScale(20),
                        resizeMode: 'contain',
                        tintColor: colors.apple
                    }}
                    source={imgSource}
                /> */}
                <Icon
                    type="material-icons"
                    name={props.disabled ? "check-circle-o" : "circle-o"}
                    size={moderateScale(20)}
                    color={props.color || "red"}
                    style={[props.style, { alignSelf: 'center' }]}
                />
                <Text style={[styles.TitleTextStyle, props.additionalTextStyle]}>
                    {props.TitleText}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    TitleTextStyle: {
        fontSize: normalize(16),
        color: 'black',
        marginLeft: widthScale(10)
    }
})

export { RadioButton };
