import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import PageComponent from '../components/PageComponent';
import { NavigationActions } from 'react-navigation'
import { logout } from '../actions/userActions';

class MyAccountContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
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
  render() {
    const { navigation, logout } = this.props;
    return (
      <PageComponent navigation={navigation} title='My Account'>
        <Button onPress={()=> logout()}>  
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
    logout
  }
)(MyAccountContainer)