import React , { Component } from 'react';
import { connect } from 'react-redux';
import {Scene, Router } from 'react-native-router-flux';

import * as SceneConst from './constants/SceneConst.js'; 

// components
import { PredictDiseaseStep1, PredictDiseaseStep2 } from './predictDisease';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

class MHRouter extends Component {
  render() {
    const RouterWithRedux = connect()(Router)
    return (
      <RouterWithRedux sceneStyle={{paddingTop: 65}}>
        <Scene key='root' initial>

          <Scene key='main' tabs={true} tabBarStyle={{ backgroundColor: '#FFFFFF' }}>

            <Scene key='predictDisease' title='Predict Disease' icon={TabIcon} initial>
              <Scene key="step1" component={PredictDiseaseStep1} title="Start"  />
              <Scene key="step2" component={PredictDiseaseStep2} title="Step 2"  />
              {/*<Scene key="step3" component={PredictDiseaseStep3} title="Finish"  />*/}
            </Scene>

            <Scene key='heartRate' title='Heart Rate' icon={TabIcon}>
              <Scene key="scanner" title="Scanner"  />
              <Scene key="liveRates" title="Live Rates"  />
            </Scene>

          </Scene>

          <Scene key='login' component={null} title='Login' hideNavBar={true} />
          <Scene key='signUp' component={null} title='SignUp' hideNavBar={true} />

        </Scene>
      </RouterWithRedux>
    );
  }
}

export default MHRouter;