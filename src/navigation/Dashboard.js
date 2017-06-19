import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

import { NavigationActions } from 'react-navigation'
import { logout } from '../actions/userActions';

import { disconnectFromDevice } from '../actions/bluetoothActions'
import { stopTaskBackground } from '../actions/heartMonitorActions';
import * as consts from '../core/constantsTask';

import PredictDisease from './PredictDisease'
import HeartMonitor from './HeartMonitor'

import redTheme from '../themes/redTheme';

class DashboardScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    stopTaskBackground: PropTypes.func.isRequired,
    disconnectFromDevice: PropTypes.func.isRequired,
    authorized: PropTypes.bool.isRequired
  }
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(newProps){
    if(newProps.authorized === false && newProps.authorized !== this.props.authorized){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'login'})
        ]
      })
      this.props.navigation.dispatch(resetAction);
    }
  }
  logout(){
    const { logout, stopTaskBackground, disconnectFromDevice } = this.props;
    logout();
    stopTaskBackground(consts.heartRateTask);
    disconnectFromDevice();
  }

  render() {
    return (
        <Container>
          <Header hasTabs androidStatusBarColor={redTheme.primaryColor} style={redTheme.header}>
              <Left>
                 
              </Left>
              <Body>
                  <Title style={redTheme.headerTitle} >MedHeart</Title>
              </Body>
              <Right>
                  <Button transparent onPress={()=> this.logout() }>
                      <Icon1 name='exit-to-app' size={27} color='white' />
                  </Button>
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

const mapStateToProps = (state) => {
  return { 
    authorized: state.user.authorized,
  }
}

export default connect(mapStateToProps,
  {
    logout,
    stopTaskBackground,
    disconnectFromDevice
  }
)(DashboardScreen)

