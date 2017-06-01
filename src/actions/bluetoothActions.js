import * as types from './types';
import * as consts from './constantsBluetooth';

import {
  action,
  getLogger,
  handleHeartrate
} from '../core/utils'

import {
  BleManager
} from 'react-native-ble-plx';
import base from 'base64-js';

import {
  NativeModules
} from 'react-native';
let CipherModule = NativeModules.CipherModule;

const log = getLogger('bluetooth/action');

let manager = new BleManager();

export const startScan = () => async(dispatch) => {
  log('Starting scan')
  dispatch(action(types.START_SCAN));
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      log(error)
      dispatch(action(types.PUSH_ERROR, {
        errorMessage: error.message
      }));
      dispatch(action(types.STOP_SCAN))
    } else {
      log(device);
      dispatch(action(types.DEVICE_FOUND, {
        id: device.id,
        name: device.name,
        rssi: device.rssi,
        isConnectable: device.isConnectable
      }));
    }
  });

}

export const stopScan = () => (dispatch) => {
  manager.stopDeviceScan();
  dispatch(action(types.STOP_SCAN))
}

export const conectToDevice = (selectedDeviceId) => (dispatch, getState) => {
  dispatch(action(types.DEVICE_STATE_CONNECTING));

  manager.connectToDevice(selectedDeviceId).then((device) => {
    device.onDisconnected((error, disconnectedDevice) => {
      if (getState().ble.isConnected) {
        dispatch(action(types.PUSH_ERROR, {
          errorMessage: 'Disconnected from ' + (disconnectedDevice.name ? disconnectedDevice.name : disconnectedDevice.uuid)
        }));
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
      }
    });
    dispatch(action(types.DEVICE_STATE_DISCOVERING));
    var promise = device.discoverAllServicesAndCharacteristics();
    return promise
  }).then(() => {
    dispatch(action(types.DEVICE_STATE_CONNECTED, {
      selectedDeviceId
    }));
  }, (rejected) => {
    dispatch(action(types.PUSH_ERROR, {
      errorMessage: rejected.message
    }));
    dispatch(action(types.DEVICE_STATE_DISCONNECTED));
  });
}

export const startAuthToMiBand2 = () => (dispatch, getState) => {
  const bleState = getState().ble;
  const selectedDeviceId = bleState.selectedDeviceId;
  const needsAuth = bleState.needsAuth;
  const authInProgress = bleState.authInProgress;

  if(!authInProgress){
    dispatch(action(types.DEVICE_STATE_AUTH_STARTED));
    
    const transactionId = 'monitor_auth';
    manager.monitorCharacteristicForDevice(selectedDeviceId, consts.UUID_SERVICE_MIBAND2_SERVICE, consts.UUID_CHARACTERISTIC_AUTH,
      (error, characteristic) => {
        log(characteristic);
        log(error);
        let data = base.toByteArray(characteristic.value);
        log(data);

        if (data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_SEND_KEY && data[2] == consts.AUTH_SUCCESS) {
          log('Sending the secret key to the band');
          let send = base.fromByteArray(consts.requestAuthNumber)
          characteristic.writeWithoutResponse(send, '2')
            .then((characteristic) => {
              let data = base.toByteArray(characteristic.value);
              log(data);
            }).catch((err) => log(err));

        } else if (data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_REQUEST_RANDOM_AUTH_NUMBER && data[2] == consts.AUTH_SUCCESS) {
          // sending the encrypted random key to the band with 2 action
          log('sending the encrypted random key to the band with 2 action');


          let rezultat = '[';
          for (let i = 0; i < data.byteLength; i++) {
            if (i > 0)
              rezultat += ', ';
            rezultat += data[i];
          }
          rezultat += ']';


          CipherModule.handleAESAuth(rezultat, JSON.stringify(consts.SECRET_KEY),
            (status) => {
              let eValue = new Uint8Array(JSON.parse(status));
              let send = new Uint8Array([consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER, consts.AUTH_BYTE, ...eValue]);
              log(eValue);
              log(send);

              send = base.fromByteArray(send);
              characteristic.writeWithoutResponse(send, '3').then((c1) => {
                log(c1);
                let data = base.toByteArray(c1.value);
                log(data);
              }).catch((err) => log(err));

            });
        } else if (data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER && data[2] == consts.AUTH_SUCCESS) {
          log('Succes auth');
          dispatch(action(types.DEVICE_STATE_AUTH_SUCCEEDED));
          dispatch(action(types.CHANGE_NEEDS_AUTH, {
            needsAuth: false
          }))
        } else if (data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER && data[2] == consts.AUTH_FAIL) {
          log('Faild ath');
          dispatch(action(types.DEVICE_STATE_AUTH_FAILED));
          dispatch(action(types.CHANGE_NEEDS_AUTH, {
            needsAuth: true
          }));
          dispatch(action(types.PUSH_ERROR, {
            errorMessage: 'Auth faild'
          }));
        }
      }, transactionId);

    if (needsAuth) {
      // first pass
      dispatch(action(types.DEVICE_STATE_AUTH_PRESS_MIBAND));
      let data = base.fromByteArray(consts.sendKey)
      manager.writeCharacteristicWithoutResponseForDevice(selectedDeviceId, consts.UUID_SERVICE_MIBAND2_SERVICE, consts.UUID_CHARACTERISTIC_AUTH, data)
        .then((characteristic) => {
          log(characteristic);
          let data = base.toByteArray(characteristic.value);
          log(data);
        }).catch((err) =>{ 
          log(err);
          dispatch(action(types.PUSH_ERROR, {
            errorMessage: err.message
          }));
          dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        });
    } else {
      log('Sending the secret key to the band');
      let send = base.fromByteArray(consts.requestAuthNumber)
      manager.writeCharacteristicWithoutResponseForDevice(selectedDeviceId, consts.UUID_SERVICE_MIBAND2_SERVICE, consts.UUID_CHARACTERISTIC_AUTH, send, '12')
        .then((characteristic) => {
          let data = base.toByteArray(characteristic.value);
          log(data);
        }).catch((err) => log(err));
    }
  }



}

import BackgroundJob from 'react-native-background-job';

export const disconnectFromDevice = (idDevice) => (dispatch) => {
  manager.cancelDeviceConnection(idDevice)
    .then(() => {
      BackgroundJob.cancelAll();
      dispatch(action(types.DEVICE_STATE_DISCONNECTED));
    }, (rejected) => {
      if (rejected.message !== 'Cancelled') {
        dispatch(action(types.PUSH_ERROR, {
          errorMessage: rejected.message
        }))
      }
      dispatch(action(types.DEVICE_STATE_DISCONNECTED));
    });
  dispatch(action(types.DEVICE_STATE_DISCONNECTING));
}

export const heartRateMeasure = () => (dispatch, getState) => {
  const bleState = getState().ble;
  const selectedDeviceId = bleState.selectedDeviceId;
  const heartRateMeasureInProgress = bleState.heartRateMeasureInProgress;

  if(!heartRateMeasureInProgress){
    dispatch(action(types.START_HEART_RATE_MEASURE));
    // stop heart rate manual
    let stopHeartMeasurementManual = base.fromByteArray(consts.stopHeartMeasurementManual)
    manager.writeCharacteristicWithResponseForDevice(selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT, stopHeartMeasurementManual)
      .then((characteristic) => {
        log(characteristic);
        let data = base.toByteArray(characteristic.value);
        log(data);
      }).catch((err) => {
        dispatch(action(types.PUSH_ERROR, {
          errorMessage: err.message
        }));
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        dispatch(action(types.STOP_HEART_RATE_MEASURE));
      });

    // stop heart rate continous
    let stopHeartMeasurementContinuous = base.fromByteArray(consts.stopHeartMeasurementContinuous)
    manager.writeCharacteristicWithResponseForDevice(selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT, stopHeartMeasurementContinuous)
      .then((characteristic) => {
        log(characteristic);
        let data = base.toByteArray(characteristic.value);
        log(data);
      }).catch((err) => {
        dispatch(action(types.PUSH_ERROR, {
          errorMessage: err.message
        }));
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        dispatch(action(types.STOP_HEART_RATE_MEASURE));
      });

    // stare heart rate manual
    let startHeartMeasurementManual = base.fromByteArray(consts.startHeartMeasurementManual)
    manager.writeCharacteristicWithResponseForDevice(selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT, startHeartMeasurementManual)
      .then((characteristic) => {
        log(characteristic);
        let data = base.toByteArray(characteristic.value);
        log(data);
      }).catch((err) => {
        dispatch(action(types.PUSH_ERROR, {
          errorMessage: err.message
        }));
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        dispatch(action(types.STOP_HEART_RATE_MEASURE));
      });

    log('start monitoring');
    const transactionId = 'monitor_heartrate';
    manager.monitorCharacteristicForDevice(selectedDeviceId, consts.UUID_SERVICE_HEART_RATE, consts.UUID_CHARACTERISTIC_HEART_RATE_MEASUREMENT,
      function (error, characteristic) {
        if(error) {
          dispatch(action(types.PUSH_ERROR, {
            errorMessage: error.message
          }));
          dispatch(action(types.DEVICE_STATE_DISCONNECTED));
          dispatch(action(types.STOP_HEART_RATE_MEASURE));
        } else {
          let data = base.toByteArray(characteristic.value);
          log(handleHeartrate(data));
          dispatch(action(types.UPDATE_HEART_RATE, { heartRate: handleHeartrate(data) }));
          dispatch(action(types.STOP_HEART_RATE_MEASURE));
        }
      }, transactionId);
    
    setTimeout(() => { 
      manager.cancelTransaction(transactionId);
      dispatch(action(types.STOP_HEART_RATE_MEASURE));
    }, 60000);
  }
  
}

export const pushError = (errorMessage) => action(types.PUSH_ERROR, errorMessage);
export const popError = () => action(types.POP_ERROR);
