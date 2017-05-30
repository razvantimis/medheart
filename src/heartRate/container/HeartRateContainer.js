/*import React, { Component } from 'react';
import { connect } from 'react-redux'


import ScannedDevices from '../components/ScannedDevices';
import PairingDevice from '../components/PairingDevice';
import MonitoringHeart from '../components/MonitoringHeart'

import * as actions from '../actions';
import * as types from '../actions/types';



class HeartRateContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { devices, scanning, startScan, stopScan, changeDeviceState, scene, deviceIdentifier, writeCharacteristic, changeScene, deviceState, heartRate, updateHeartRate } = this.props;
    
    switch(scene){
    case types.SCANNER_DECIVES:
      return <ScannedDevices 
            nextDeviceState={types.DEVICE_STATE_CONNECT} 
            devices={devices} 
            scanning={scanning} 
            startScan={startScan} 
            stopScan={stopScan} 
            changeDeviceState={changeDeviceState}
            changeScene={changeScene}
            scene={types.PAIRING_DEVICE}/>;
    case types.PAIRING_DEVICE:
      return <PairingDevice 
              deviceState={deviceState} 
              deviceFinalStep={types.DEVICE_STATE_AUTH_SUCCES}
              deviceDisconectedStep={types.DEVICE_STATE_DISCONNECTED}
              changeScene={changeScene}
              nextScene={types.HEART_RATE_DASHBOARD} 
              prevScene={types.SCANNER_DECIVES} />
    case types.HEART_RATE_DASHBOARD:
      return <MonitoringHeart
              deviceState={deviceState} 
              prevScene={types.PAIRING_DEVICE}
              changeScene={changeScene}
              changeDeviceState={changeDeviceState}
              selectedDeviceId={deviceIdentifier}
              heartRate={heartRate}
              updateHeartRate={updateHeartRate}
               />
    default:
      return (<ScannedDevices state={types.DEVICE_STATE_CONNECT} devices={devices} scanning={scanning} startScan={startScan} stopScan={stopScan} changeDeviceState={changeDeviceState}/> );
  
    }

  }
}

export default connect(
  state => ({
    devices: state.ble.devices,
    deviceIdentifier: state.ble.deviceIdentifier,
    scanning: state.ble.scanning,
    scene: state.heartRate.scene,
    deviceState: state.ble.state,
    heartRate: state.heartRate.heartRate
  }),
  {
    startScan: actions.startScan,
    stopScan: actions.stopScan,
    changeDeviceState: actions.changeDeviceState,
    writeCharacteristic: actions.writeCharacteristic,
    changeScene: actions.changeScene,
    updateHeartRate: actions.updateHeartRate
  })(HeartRateContainer);*/
