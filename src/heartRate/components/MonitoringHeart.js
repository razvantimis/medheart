import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
    Container,
    Content
} from 'native-base';

import { BleManager } from 'react-native-ble-plx';


import * as consts from '../constants';
import base from 'base64-js';

import Heart from '../../components/common/Heart';
import * as types from '../actions/types';

class MonitoringHeart extends Component {
  constructor(){
    super();
    this.manager = new BleManager();
    this.heartMonitoring = null;
 
  }

  componentDidMount(){
   this.props.changeDeviceState(null,types.START_HEART_RATE_MONITORING);
  }

  
  heartRate(){
    let stopHeartMeasurementManual = base.fromByteArray(consts.stopHeartMeasurementManual)
    this.manager.writeCharacteristicWithResponseForDevice(this.props.selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT, stopHeartMeasurementManual)
    .then((characteristic)=> {
      console.log(characteristic );
      let data = base.toByteArray(characteristic.value);
      console.log(data);
    }).catch((err)=> console.log(err));

    let stopHeartMeasurementContinuous = base.fromByteArray(consts.stopHeartMeasurementContinuous)
    this.manager.writeCharacteristicWithResponseForDevice(this.props.selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT, stopHeartMeasurementContinuous)
    .then((characteristic)=> {
      console.log(characteristic );
      let data = base.toByteArray(characteristic.value);
      console.log(data);
    }).catch((err)=> console.log(err));

    let startHeartMeasurementManual = base.fromByteArray(consts.startHeartMeasurementManual)
    this.manager.writeCharacteristicWithResponseForDevice(this.props.selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT, startHeartMeasurementManual)
    .then((characteristic)=> {
      console.log(characteristic );
      let data = base.toByteArray(characteristic.value);
      console.log(data);
    }).catch((err)=> console.log(err));
    console.log('start monitoring');
    let self = this;
    this.heartMonitoring = this.manager.monitorCharacteristicForDevice(this.props.selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_MEASUREMENT, 
    function(error, characteristic){

        let data = base.toByteArray(characteristic.value);
        console.log(self.handleHeartrate(data))
        self.props.updateHeartRate(self.handleHeartrate(data))
    });
  }
  handleHeartrate(value) {
    if (value.length == 2 && value[0] == 0) {
      let hrValue = (value[1] & 0xff);
      return hrValue
    } else {
      return 0;
    }
  }

  render(){
   
    return (
        
    <Container>
        <Content>
            <TouchableOpacity onPress={()=>this.heartRate()}>
                <Heart scale={10}  value={this.props.heartRate.toString()}/>
            </TouchableOpacity>
        </Content>
    </Container>
    );
  }
}

export default MonitoringHeart;