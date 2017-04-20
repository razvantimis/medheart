import React , { Component } from 'react';
import { connect } from 'react-redux';
import {Scene, Router } from 'react-native-router-flux';

import * as SceneConst from './constants/SceneConst.js'; 

// components

import { Login } from './auth';
import { Signup } from './auth';
import Dashboard from './MHDashboard';


class MHRouter extends Component {
  render() {
    const RouterWithRedux = connect()(Router)
    return (
      <RouterWithRedux hideNavBar>
        <Scene key='root'>
      
          <Scene key='login' component={Login} />
          <Scene key='signUp' component={Signup} />
          <Scene key='dashboard' component={Dashboard} initial />        
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default MHRouter;