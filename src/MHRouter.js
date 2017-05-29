import React , { Component } from 'react';
import {Scene, Router } from 'react-native-router-flux';

import { connect } from 'react-redux';
// components

import { Login, Signup } from './components/auth';




class MHRouter extends Component {
  render() {
  
    const RouterWithRedux = connect()(Router);

    return (
      <RouterWithRedux>
        <Scene key='root'>
          <Scene key='login' component={Signup}/>
          {/*<Scene key='signUp' component={Signup} hideNavBar={true} />
          */}
          {/*<Scene hideTabBar key='main' tabs={true} initial>

            <Scene key='predictDisease'>
              <Scene key="step1" component={PredictDiseaseContainer} />
              <Scene key="step2" component={PredictDiseaseContainer} />
              <Scene key="step3" component={PredictDiseaseContainer} />
            </Scene>

            <Scene key='heartMonitor' title='Heart Rate' >
              <Scene key="scanner" title="Scanner" component={HeartRateContainer}   />
              <Scene key="scanner" title="Scanner" component={HeartRateContainer}  />
              <Scene key="liveRates" title="Live Rates" component={HeartRateContainer}  />       
            </Scene>

          </Scene>*/}

        </Scene>
      </RouterWithRedux>
    )
  }
}

export default MHRouter;