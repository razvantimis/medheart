import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class Signup extends Component {

    render() {
        return (
            <View style={{backgroundColor:'red'}}>
                <Text>Signup</Text>
            </View>
        );
    }
}

export default connect(
  state => ({}),
  {})
(Signup);