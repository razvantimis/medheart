import React , { Component } from 'react';

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