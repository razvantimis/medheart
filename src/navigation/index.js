import React , { PropTypes } from 'react';
import { connect } from 'react-redux';

import { StackNavigator, addNavigationHelpers } from 'react-navigation';

import Dashboard from './Dashboard';
import LoginContainer from '../containers/LoginContainer'
import MyAccountContainer from '../containers/MyAccountContainer'
import AlertContainer from '../containers/AlertContainer'

export const AppNavigator = StackNavigator({
  login: { screen: LoginContainer },
  dashboard: { screen: Dashboard },
  account: { screen: MyAccountContainer },
  alert: { screen: AlertContainer }
},{
  initialRouteName: 'login',
  headerMode: 'none',
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);