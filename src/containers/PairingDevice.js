import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Spinner
} from 'native-base';

import { startAuthToMiBand2 } from '../actions/bluetoothActions';

class PairingDevice extends Component {
  static propTypes = {
    startAuthToMiBand2: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    connectInProgress: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired
  }
  componentWillMount(){
    this.check(this.props);
  }
  componentWillReceiveProps(newProps) {
    this.check(newProps);
  }
  check(newProps){
    if(!newProps.connectInProgress && !newProps.authInProgress && !newProps.isConnected ){
      //newProps.navigation.goBack();
    } 
    if(newProps.isConnected && !newProps.isAuth && !newProps.authInProgress ){
      this.props.startAuthToMiBand2();
    }
    if(newProps.isAuth){
      newProps.navigation.navigate('heartMonitor');
    }
  }

  render(){
     
    return (
            <Container>
                <Content>
                    <Spinner color='red'></Spinner>
                </Content>
            </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return { 
    isConnected: state.ble.isConnected,
    isAuth: state.ble.isAuth,
    authInProgress: state.ble.authInProgress,
    connectInProgress: state.ble.connectInProgress
  }
}

export default connect(mapStateToProps, {
  startAuthToMiBand2
})(PairingDevice);