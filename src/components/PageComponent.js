import React, { Component, PropTypes } from 'react';
import { Container, 
        Header,
        Title,
        Body,
        Left,
        Button,
        Right,
        Content } from 'native-base';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import redTheme from '../themes/redTheme';
class PageComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
  }
  render() {
    const { title, navigation, children } = this.props;
    return (
      <Container>
          <Header androidStatusBarColor={redTheme.primaryColor} style={redTheme.header}>
              <Left>
                  <Button transparent onPress={()=>navigation.goBack()}>
                      <Icon2 name='arrow-back' size={25} color='white' />
                  </Button>
              </Left>
              <Body>
                  <Title style={redTheme.headerTitle} >{title}</Title>
              </Body>
              <Right />
          </Header>
         <Content>
           {children}
          </Content>
        </Container>
    )
  }
}


export default PageComponent;