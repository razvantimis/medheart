import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Content, Icon } from 'native-base';

class Login extends Component {

    render() {
        return (
             <Content>
                    <Icon name='home' />
                    <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>
            </Content>
        );
    }
}

export default connect(
  state => ({}),
  {})
(Login);