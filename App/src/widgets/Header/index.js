import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import scaling from '../../config/device/normalize';
import colors from '../../../Assets/colors';
import ListerIcon from '../../ListerIcon';
import Icon from 'react-native-vector-icons/FontAwesome';


const { widthScale, heightScale, normalize } = scaling;

const renderLeftMenu = (props) => {
    return (
        <TouchableOpacity
            onPress={() => { props.onMenuPressed && props.onMenuPressed() }}
            style={{ position: 'absolute', top: widthScale(15), left: widthScale(10), top: 15, bottom: 0, justifyContent: 'center' }}
        >
            <Icon
                type="AntDesign"
                name="bars"
                size={30}
                color={colors.Theme_Color}
            />
        </TouchableOpacity>
    )
}

const Header = (props) => {
    return (
        <View style={{ height: heightScale(70), backgroundColor: colors.Red_Backgroud, justifyContent: 'center', alignItems: 'center', paddingTop: heightScale(15) }}>
            {renderLeftMenu(props)}
            <ListerIcon size={30} color={colors.Theme_Color} style={{}} />

        </View>
    )
}


export default Header;