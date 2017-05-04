import React, { Component } from 'react';
import { connect } from 'react-redux'


import ScannedDevices from '../components/ScannedDevices';
import PairingDevice from '../components/PairingDevice';
import * as bleActions from '../actions/BleActions';
import * as types from '../actions/types';


class HeartRateContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { devices, scanning, startScan, stopScan, changeDeviceState, deviceState } = this.props;
    
    switch(deviceState){
      case types.DEVICE_STATE_DISCONNECT:
        return <ScannedDevices state={types.DEVICE_STATE_CONNECT} devices={devices} scanning={scanning} startScan={startScan} stopScan={stopScan} changeDeviceState={changeDeviceState}/> ;
      case types.DEVICE_STATE_CONNECTING:
        return <PairingDevice />
      default:
        return (<ScannedDevices state={types.DEVICE_STATE_CONNECT} devices={devices} scanning={scanning} startScan={startScan} stopScan={stopScan} changeDeviceState={changeDeviceState}/> );
  
    };

  }
}



export default connect(
  state => ({
    devices: state.ble.devices,
    scanning: state.ble.scanning,
    deviceState: state.ble.state
  }),
  {
    startScan: bleActions.startScan,
    stopScan: bleActions.stopScan,
    changeDeviceState: bleActions.changeDeviceState
  })
  (HeartRateContainer);
