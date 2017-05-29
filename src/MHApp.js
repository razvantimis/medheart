import React, { Component } from 'react';
import { Provider } from 'react-redux';
 
import MHRouter from './MHRouter';
import configureStore  from './MHStore';


class MHApp extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
             <MHRouter />
      </Provider>
    );
  }
}

export default MHApp;