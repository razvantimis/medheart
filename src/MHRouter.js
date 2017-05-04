import React , { Component } from 'react';
import { connect } from 'react-redux';


import * as SceneConst from './constants/SceneConst.js'; 

// components

import { Login } from './auth';
import { Signup } from './auth';
import Dashboard from './MHDashboard';


class MHRouter extends Component {
  render() {
  
    return ( <Dashboard /> );
  }
}

export default MHRouter;