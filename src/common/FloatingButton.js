import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

const FloatingButton = ( { onPress, children } ) => {
    const { buttonStyle , textStyle } = styles;
    return (
        <TouchableHighlight onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
            {children}
            </Text>
        </TouchableHighlight>
    );
};

const styles = {
    textStyle: {
        color: 'white',
        fontSize: 30,
    },
    buttonStyle: {
        zIndex: 99,
        backgroundColor: 'red',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 70,
        width: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right:20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
            }
    }
};


export { FloatingButton };