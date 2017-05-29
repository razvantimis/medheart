import React , { Component } from 'react';
import { Text, Platform } from 'react-native';
import {Scene, Router, Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
// components

import { Login, Signup } from './components/auth';

import { PredictDiseaseStep1, PredictDiseaseStep2, PredictDiseaseStep3 } from './containers/predictDisease';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

class MHRouter extends Component {
  render() {
  
    const RouterWithRedux = connect()(Router);
    let style = {
        tabBarStyle: {
             ...Platform.select({
              ios: {
                top: 64,
              },
              android: {
                top: 54,
              },
            }),
            borderTopWidth : .5,
            borderColor    : '#b7b7b7',
            backgroundColor: 'white',
            opacity        : 1
        }
    };

    return (
      <RouterWithRedux>
        <Scene key='root'>
          <Scene key='login' component={Signup}/>
          <Scene key='signUp' component={Signup}/>
          
          <Scene key='dashboard' title='tabs' tabs tabBarStyle={style.tabBarStyle} initial>

            <Scene key='predictDisease' title='Predict Disease' style={{paddingTop:100}} icon={TabIcon}>
              <Scene key="step1" title='Predict Disease' component={PredictDiseaseStep1} />
              <Scene key="step2" title='Predict Disease' component={PredictDiseaseStep2} />
              <Scene key="step3" title='Predict Disease' component={PredictDiseaseStep3} initial/>
            </Scene>

            <Scene key='heartMonitor' title='Heart Rate' icon={TabIcon}>
              <Scene key="scanner" title="Scanner" component={Signup}   />
            </Scene>

          </Scene>

        </Scene>
      </RouterWithRedux>
    )
  }
}

export default MHRouter;