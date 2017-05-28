import React, { Component } from 'react';
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
    const { devices, scanning, startScan, stopScan, changeDeviceState, deviceState, deviceIdentifier, writeCharacteristic } = this.props;
    
    switch(deviceState){
    case types.SCANNER_DECIVES:
      return <ScannedDevices state={types.DEVICE_STATE_CONNECT} devices={devices} scanning={scanning} startScan={startScan} stopScan={stopScan} changeDeviceState={changeDeviceState}/>;
    case types.PARINING_DEVICE:
      return <PairingDevice />
    case types.HEART_RATE_DASHBOARD:
      return <MonitoringHeart />
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
    deviceState: state.heartRate.state
  }),
  {
    startScan: actions.startScan,
    stopScan: actions.stopScan,
    changeDeviceState: actions.changeDeviceState,
    writeCharacteristic: actions.writeCharacteristic
  })(HeartRateContainer);
