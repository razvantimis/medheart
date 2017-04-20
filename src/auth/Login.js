import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Icon, Container, Header, Body, Title } from 'native-base';

class Login extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Login</Title>
                    </Body>
                </Header>
                <Content>
                        <Icon name='home' />
                        <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>
                </Content>
            </Container>
        );
    }
}

export default connect(
  state => ({}),
  {})
(Login);