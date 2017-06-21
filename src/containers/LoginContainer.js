import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View , StyleSheet, Text, NetInfo, Alert } from 'react-native';
import { connect } from 'react-redux';
import { onLogin, checkUserExists } from '../actions/userActions';

import SplashScreen from '../components/SplashScreen';
import redTheme from '../themes/redTheme';

import {
    Spinner
} from 'native-base';

class LoginContainer extends Component {
  static propTypes= {
    onLogin: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func.isRequired,
    authorizing: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    logout: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired
  }

  componentWillMount(){
    if(this.props.logout === false){
      this.props.checkUserExists();
    }
  }

  onLogin(){
    const { onLogin, checkUserExists } = this.props;
    if(this.props.logout === true){
      checkUserExists();
    } else {
      onLogin();
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.authorized === true && this.props.authorized !== newProps.authorized){
      this.props.navigation.navigate('dashboard');
    } else if (this.props.error){
      NetInfo.isConnected.fetch().then(isConnected => {
        if(!isConnected){
          Alert.alert('Error', 'Please connect to internet!')
        }
      });
    }

  }
  render() {
    const { authorizing } = this.props;
    return (
      <SplashScreen>
         {!authorizing && <TouchableOpacity activeOpacity={.8} onPress={()=> this.onLogin()}>
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Începeți</Text>
                          </View>
                      </TouchableOpacity>
         }
         {authorizing && <Spinner color='white'></Spinner> }
      </SplashScreen>
    )
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: redTheme.primaryColor,
    fontWeight: '600',
    fontSize: 18,
  },
});
const mapStateToProps = (state) => {
  return { 
    authorized: state.user.authorized,
    authorizing: state.user.authorizing,
    logout: state.user.logout,
    error: state.user.error,

  }
}

export default connect(mapStateToProps,
  {
    onLogin,
    checkUserExists
  }
)(LoginContainer)