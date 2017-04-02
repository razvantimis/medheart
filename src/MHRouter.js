import React , { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {Scene, Router } from 'react-native-router-flux';

import * as SceneConst from './constants/SceneConst.js'; 

// components
import { PredictDiseaseStep1, PredictDiseaseStep2, PredictDiseaseStep3 } from './predictDisease';
import { ScannedDevicesContainer } from './heartRate';
import { Login } from './login';
import { Signup } from './signup';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

class MHRouter extends Component {
  render() {
    const RouterWithRedux = connect()(Router)
    return (
      <RouterWithRedux hideNavBar>
        <Scene key='root'>
          <Scene key='login' component={Login} />
          <Scene key='signUp' component={Signup} />
          
          <Scene hideTabBar key='main' tabs={true} initial>

            <Scene key='predictDisease'>
              <Scene key="step1" component={PredictDiseaseStep1} />
              <Scene key="step2" component={PredictDiseaseStep2} />
              <Scene key="step3" component={PredictDiseaseStep3} />
            </Scene>

            <Scene key='heartRate'>
              <Scene key="scanner" component={ScannedDevicesContainer} />
              <Scene key="liveRates" component={PredictDiseaseStep1} />
            </Scene>

          </Scene>
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default MHRouter;