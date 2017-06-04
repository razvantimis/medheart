import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import PageComponent from '../components/PageComponent';
import { NavigationActions } from 'react-navigation'
import { logout } from '../actions/userActions';

import { disconnectFromDevice } from '../actions/bluetoothActions'
import { stopTaskBackground } from '../actions/heartMonitorActions';
import * as consts from '../core/constantsTask';

class MyAccountContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    stopTaskBackground: PropTypes.func.isRequired,
    disconnectFromDevice: PropTypes.func.isRequired,
    authorized: PropTypes.bool.isRequired
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
    const { navigation } = this.props;
    return (
      <PageComponent navigation={navigation} title='My Account'>
        <Button onPress={()=> this.logout()}>  
          <Text>Logout</Text>
        </Button>
      </PageComponent>
      
    )
  }
}
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
)(MyAccountContainer)