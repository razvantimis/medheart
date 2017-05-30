import React, { Component } from 'react';
import { Provider } from 'react-redux';
 
import MHNavigation from './navigation';
import configureStore  from './config/store';


class MHApp extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
             <MHNavigation />
      </Provider>
    );
  }
}

export default MHApp;