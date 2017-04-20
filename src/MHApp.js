import React, { Component } from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';
 
import MHRouter from './MHRouter';
import configureStore  from './MHStore';
import { BleService } from './heartRate';

class MHApp extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
          <View style={{flex:1}}>
             <MHRouter />
             <BleService/>
          </View>
      </Provider>
    );
  }
}

export default MHApp;