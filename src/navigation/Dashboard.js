import React, { Component, PropTypes } from 'react';
import { Container, 
        Header,
        Title,
        Body,
        Tabs,
        Tab,
        Left,
        Button,
        Right } from 'native-base';

import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


import PredictDisease from './PredictDisease'
import HeartMonitor from './HeartMonitor'

import redTheme from '../themes/redTheme';

class DashboardScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
  }

  render() {
    return (
        <Container>
          <Header hasTabs androidStatusBarColor={redTheme.primaryColor} style={redTheme.header}>
              <Left>
                  <Button transparent onPress={()=>this.props.navigation.navigate('account')}>
                      <Icon1 name='account' size={25} color='white' />
                  </Button>
              </Left>
              <Body>
                  <Title style={redTheme.headerTitle} >MedHeart</Title>
              </Body>
              <Right>
                 
              </Right>
          </Header>
          <Tabs tabBarUnderlineStyle={redTheme.headerTab.underline} >
            <Tab heading="Predict Disease" 
            tabStyle={redTheme.headerTab.content} textStyle={redTheme.headerTab.text} 
            activeTabStyle={redTheme.headerTab.activeContent} 
            activeTextStyle={redTheme.headerTab.activeText} >
              <PredictDisease />
            </Tab>

            <Tab heading="Heart Rate" 
             tabStyle={redTheme.headerTab.content} textStyle={redTheme.headerTab.text} 
            activeTabStyle={redTheme.headerTab.activeContent} 
            activeTextStyle={redTheme.headerTab.activeText} >
              <HeartMonitor />
            </Tab>
          </Tabs>
          
        </Container>
    );
  }
}
DashboardScreen.navigationOptions = {
  title: 'MedHeart'
};

export default DashboardScreen;
