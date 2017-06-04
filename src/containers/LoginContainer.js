import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View , StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import {  onLogin, checkUserExists } from '../actions/userActions';

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
    navigation: PropTypes.object.isRequired
  }
  componentWillMount(){
    this.props.checkUserExists();
  }
  onLogin(){
    const { onLogin } = this.props;
    onLogin();
  }
  componentWillReceiveProps(newProps){
    if(newProps.authorized === true){
      this.props.navigation.navigate('dashboard');
    }

  }
  render() {
    const { authorizing } = this.props;
    return (
      <SplashScreen>
         {!authorizing && <TouchableOpacity activeOpacity={.8} onPress={()=> this.onLogin()}>
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Start</Text>
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
    authorizing: state.user.authorizing
  }
}

export default connect(mapStateToProps,
  {
    onLogin,
    checkUserExists
  }
)(LoginContainer)