import React, { Component } from 'react';
import { connect } from 'react-redux'


import ScannedDevices from '../components/ScannedDevices'
import * as bleActions from '../actions/BleActions'
import { Actions } from 'react-native-router-flux'

class HeartRateContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { devices, scanning, startScan, stopScan, changeDeviceState } = this.props;
    return (
      <ScannedDevices devices={devices} scanning={scanning} startScan={startScan} stopScan={stopScan} changeDeviceState ={changeDeviceState}/>
    );
  }
}



export default connect(
  state => ({
    devices: state.ble.devices,
    scanning: state.ble.scanning
  }),
  {
    startScan: bleActions.startScan,
    stopScan: bleActions.stopScan,
    changeDeviceState: bleActions.changeDeviceState
  })
  (HeartRateContainer);
