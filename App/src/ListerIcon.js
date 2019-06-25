import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ListerIcon = props => {
    return (
        <Icon
            type='AntDesign'//"material-icons"
            name="gitlab" //"check-circle-o","circle-o"
            size={props.size}
            color={props.color || "red"}
            style={[props.style, { alignSelf: 'center' }]}
        />
    )
}