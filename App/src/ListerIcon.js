import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ListerIcon = props => {
    return (
        <Icon
            type="AntDesign"
            name="gitlab"
            size={props.size}
            color="red"
            style={{ alignSelf: 'center' }}
        />
    )
}