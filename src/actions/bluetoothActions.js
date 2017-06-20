import * as types from './types';
import * as consts from '../core/constantsBluetooth';
import { action, getLogger, handleHeartrate, sleep } from '../core/utils';
import * as _ from 'lodash';
import { BleManager } from 'react-native-ble-plx';
import base from 'base64-js';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import firebase from '../MHFireBase';

import { NativeModules } from 'react-native';
let CipherModule = NativeModules.CipherModule;

const log = getLogger('bluetooth/action');

let manager = new BleManager();

export const startScan = () => dispatch => {
  log('startScan: Starting scan');
  dispatch(action(types.START_SCAN));
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      dispatch(
        action(types.PUSH_ERROR, {
          errorMessage: error.message
        })
      );
      dispatch(action(types.STOP_SCAN));
    } else {
      dispatch(
        action(types.DEVICE_FOUND, {
          id: device.id,
          name: device.name,
          rssi: device.rssi,
          isConnectable: device.isConnectable
        })
      );
    }
    sleep(500);
  });
  setTimeout(() => {
    log('startScan: stop scan timer');
    manager.stopDeviceScan();
    dispatch(action(types.STOP_SCAN));
  }, 30000);
  log('startScan: end');
};

export const stopScan = () => dispatch => {
  log('stopScan: start');
  manager.stopDeviceScan();
  dispatch(action(types.STOP_SCAN));
  log('stopScan: end');
};

export const conectToDevice = selectedDeviceId => (dispatch, getState) => {
  dispatch(action(types.DEVICE_STATE_CONNECTING));

  manager
    .connectToDevice(selectedDeviceId)
    .then(device => {
      device.onDisconnected((error, disconnectedDevice) => {
        if (getState().ble.isConnected) {
          dispatch(
            action(types.PUSH_ERROR, {
              errorMessage: 'Disconnected from ' +
                (disconnectedDevice.name
                  ? disconnectedDevice.name
                  : disconnectedDevice.uuid)
            })
          );
          dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        }
      });
      dispatch(action(types.DEVICE_STATE_DISCOVERING));
      var promise = device.discoverAllServicesAndCharacteristics();
      return promise;
    })
    .then(
      () => {
        dispatch(
          action(types.DEVICE_STATE_CONNECTED, {
            selectedDeviceId
          })
        );
      },
      rejected => {
        dispatch(
          action(types.PUSH_ERROR, {
            errorMessage: rejected.message
          })
        );
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
      }
    );
};

export const startAuthToMiBand2 = () => (dispatch, getState) => {
  const bleState = getState().ble;
  const selectedDeviceId = bleState.selectedDeviceId;
  const needsAuth = bleState.needsAuth;
  const authInProgress = bleState.authInProgress;

  if (!authInProgress) {
    log('startAuthToMiBand2: Start')
    dispatch(action(types.DEVICE_STATE_AUTH_STARTED));

    const transactionId = 'monitor_auth';
    manager.monitorCharacteristicForDevice(
      selectedDeviceId,
      consts.UUID_SERVICE_MIBAND2_SERVICE,
      consts.UUID_CHARACTERISTIC_AUTH,
      (error, characteristic) => {
        if (error) {
          log(error);
          dispatch(
            action(types.PUSH_ERROR, {
              errorMessage: error.message
            })
          );
          dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        } else {
          let data = base.toByteArray(characteristic.value);
          log(data);

          if (
            data[0] == consts.AUTH_RESPONSE &&
            data[1] == consts.AUTH_SEND_KEY &&
            data[2] == consts.AUTH_SUCCESS
          ) {
            log('startAuthToMiBand2: Sending the secret key to the band');
            let send = base.fromByteArray(consts.requestAuthNumber);
            characteristic
              .writeWithoutResponse(send, '2')
              .then(characteristic => {
                let data = base.toByteArray(characteristic.value);
                log(data);
              })
              .catch(err => {
                log('startAuthToMiBand2 ' + err.message);
                dispatch(
                  action(types.PUSH_ERROR, {
                    errorMessage: err.message
                  })
                );
                dispatch(action(types.DEVICE_STATE_DISCONNECTED));
              });
          } else if (
            data[0] == consts.AUTH_RESPONSE &&
            data[1] == consts.AUTH_REQUEST_RANDOM_AUTH_NUMBER &&
            data[2] == consts.AUTH_SUCCESS
          ) {
            // sending the encrypted random key to the band with 2 action
            log('startAuthToMiBand2: sending the encrypted random key to the band with 2 action');

            let rezultat = '[';
            for (let i = 0; i < data.byteLength; i++) {
              if (i > 0) rezultat += ', ';
              rezultat += data[i];
            }
            rezultat += ']';

            CipherModule.handleAESAuth(
              rezultat,
              JSON.stringify(consts.SECRET_KEY),
              status => {
                let eValue = new Uint8Array(JSON.parse(status));
                let send = new Uint8Array([
                  consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER,
                  consts.AUTH_BYTE,
                  ...eValue
                ]);

                send = base.fromByteArray(send);
                characteristic
                  .writeWithoutResponse(send, '3')
                  .then(c1 => {
                    let data = base.toByteArray(c1.value);
                    log(data);
                  })
                  .catch(err => {
                    log('startAuthToMiBand2 ' + err.message);
                    dispatch(
                      action(types.PUSH_ERROR, {
                        errorMessage: err.message
                      })
                    );
                    dispatch(action(types.DEVICE_STATE_DISCONNECTED));
                  });
              }
            );
          } else if (
            data[0] == consts.AUTH_RESPONSE &&
            data[1] == consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER &&
            data[2] == consts.AUTH_SUCCESS
          ) {
            log('startAuthToMiBand2: Succes auth');
            dispatch(action(types.DEVICE_STATE_AUTH_SUCCEEDED));
            dispatch(
              action(types.CHANGE_NEEDS_AUTH, {
                needsAuth: false
              })
            );
          } else if (
            data[0] == consts.AUTH_RESPONSE &&
            data[1] == consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER &&
            data[2] == consts.AUTH_FAIL
          ) {
            log('startAuthToMiBand2: Faild ath');
            dispatch(action(types.DEVICE_STATE_AUTH_FAILED));
            dispatch(
              action(types.CHANGE_NEEDS_AUTH, {
                needsAuth: true
              })
            );
            dispatch(
              action(types.PUSH_ERROR, {
                errorMessage: 'Auth faild'
              })
            );
          }
        }
      },
      transactionId
    );
    setTimeout(() => {
      log('startAuthToMiBand2: Cancel tranaaction : '+transactionId)
      manager.cancelTransaction(transactionId);
    }, 10000);

    if (needsAuth) {
      // first pass
      log('startAuthToMiBand2: Send my key')
      dispatch(action(types.DEVICE_STATE_AUTH_PRESS_MIBAND));
      let data = base.fromByteArray(consts.sendKey);
      manager
        .writeCharacteristicWithoutResponseForDevice(
          selectedDeviceId,
          consts.UUID_SERVICE_MIBAND2_SERVICE,
          consts.UUID_CHARACTERISTIC_AUTH,
          data
        )
        .then(characteristic => {
          let data = base.toByteArray(characteristic.value);
          log('startAuthToMiBand2: ' + data);
        })
        .catch(err => {
          log('startAuthToMiBand2: ' + err.message);
          dispatch(
            action(types.PUSH_ERROR, {
              errorMessage: err.message
            })
          );
          dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        });
    } else {
      log('startAuthToMiBand2: Sending the secret key to the band');
      let send = base.fromByteArray(consts.requestAuthNumber);
      manager
        .writeCharacteristicWithoutResponseForDevice(
          selectedDeviceId,
          consts.UUID_SERVICE_MIBAND2_SERVICE,
          consts.UUID_CHARACTERISTIC_AUTH,
          send
        )
        .then(characteristic => {
          let data = base.toByteArray(characteristic.value);
          log('startAuthToMiBand2: ' + data);
        })
        .catch(err =>{  
          log('startAuthToMiBand2: ' + err.message);
          dispatch(
            action(types.PUSH_ERROR, {
              errorMessage: err.message
            })
          );
          dispatch(action(types.DEVICE_STATE_DISCONNECTED))
        });
    }
  }
  log('startAuthToMiBand2: End')
};

export const disconnectFromDevice = () => (dispatch, getState) => {
  const idDevice = getState().ble.selectedDeviceId;
  log('disconnectFromDevice: Start')
  if(idDevice){
    manager.cancelDeviceConnection(idDevice).then(
    () => {
      dispatch(action(types.DEVICE_STATE_DISCONNECTED));
      log('disconnectFromDevice: Succes')
    },
      rejected => {
        log('disconnectFromDevice: Error or Cancelled')
        if (rejected.message !== 'Cancelled') {
          dispatch(
            action(types.PUSH_ERROR, {
              errorMessage: rejected.message
            })
          );
        }
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
      }
    );
    dispatch(action(types.DEVICE_STATE_DISCONNECTING));
    log('disconnectFromDevice: End')
  }

};

export const heartRateMeasure = () => (dispatch, getState) => {
  let manager = new BleManager();
  const bleState = getState().ble;
  const selectedDeviceId = bleState.selectedDeviceId;
  const heartRateMeasureInProgress = bleState.heartRateMeasureInProgress;
  log('heartRateMeasure: Start')
  if (!heartRateMeasureInProgress) {
    log('heartRateMeasure: Processing')
    dispatch(action(types.START_HEART_RATE_MEASURE));
    // stop heart rate manual
    let stopHeartMeasurementManual = base.fromByteArray(
      consts.stopHeartMeasurementManual
    );
    log('heartRateMeasure: Stop heart measurement manual start');
    manager
      .writeCharacteristicWithResponseForDevice(
        selectedDeviceId,
        consts.UUID_SERVICE_HEART_RATE,
        consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT,
        stopHeartMeasurementManual
      )
      .then(() => {
        log('heartRateMeasure: Stop heart measurement manual Succes');
      })
      .catch(err => {
        dispatch(
          action(types.PUSH_ERROR, {
            errorMessage: err.message
          })
        );
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        dispatch(action(types.STOP_HEART_RATE_MEASURE));
        log('heartRateMeasure: Error = ' + err.message);
      });
    log('heartRateMeasure: Stop heart measurement manual end');
    // stop heart rate continous
    let stopHeartMeasurementContinuous = base.fromByteArray(
      consts.stopHeartMeasurementContinuous
    );
    log('heartRateMeasure: Stop heart measurement continu start');
    manager
      .writeCharacteristicWithResponseForDevice(
        selectedDeviceId,
        consts.UUID_SERVICE_HEART_RATE,
        consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT,
        stopHeartMeasurementContinuous
      )
      .then(() => {
        log('heartRateMeasure: Stop heart measurement continu Succes');
      })
      .catch(err => {
        dispatch(
          action(types.PUSH_ERROR, {
            errorMessage: err.message
          })
        );
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        dispatch(action(types.STOP_HEART_RATE_MEASURE));
        log('heartRateMeasure: Stop heart measurement continu error: ' + err.message);
      });

    // stare heart rate manual
    let startHeartMeasurementManual = base.fromByteArray(
      consts.startHeartMeasurementManual
    );
    log('heartRateMeasure: start heart measurement manual start');
    manager
      .writeCharacteristicWithResponseForDevice(
        selectedDeviceId,
        consts.UUID_SERVICE_HEART_RATE,
        consts.UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT,
        startHeartMeasurementManual
      )
      .then(() => {
        log('heartRateMeasure: start heart measurement manual succes');
      })
      .catch(err => {
        dispatch(
          action(types.PUSH_ERROR, {
            errorMessage: err.message
          })
        );
        dispatch(action(types.DEVICE_STATE_DISCONNECTED));
        dispatch(action(types.STOP_HEART_RATE_MEASURE));
        log('heartRateMeasure: start heart measurement manual error: ' + err.message);
      });
    log('heartRateMeasure: start heart measurement manual end');
    log('heartRateMeasure: start monitoring heart');
    const transactionId = 'monitor_heartrate';
    manager.monitorCharacteristicForDevice(
      selectedDeviceId,
      consts.UUID_SERVICE_HEART_RATE,
      consts.UUID_CHARACTERISTIC_HEART_RATE_MEASUREMENT,
      function(error, characteristic) {
        if (error) {
          dispatch(
            action(types.PUSH_ERROR, {
              errorMessage: error.message
            })
          );
          dispatch(action(types.DEVICE_STATE_DISCONNECTED));
          dispatch(action(types.STOP_HEART_RATE_MEASURE));
          log('heartRateMeasure: monitoring heart error: '+ error.message);
        } else {
          let data = base.toByteArray(characteristic.value);
          let heartRate = handleHeartrate(data);
          log('heartRateMeasure: monitoring heart - heartRate = ' + heartRate);
          updateOnFirebase(dispatch, heartRate);
          dispatch(
            action(types.UPDATE_HEART_RATE, {
              heartRate
            })
          );
          dispatch(action(types.STOP_HEART_RATE_MEASURE));
        }
      },
      transactionId
    );
    setTimeout(() => {
      log('heartRateMeasure: monitoring heart cancel tranzaction');
      manager.cancelTransaction(transactionId);
      dispatch(action(types.STOP_HEART_RATE_MEASURE));
    }, 25000);
    sleep(25000);
  } else {
    dispatch(action(types.STOP_HEART_RATE_MEASURE));
  }
};

export const pushError = errorMessage => (dispatch, getState) => {
  const errors = getState().ble.errors;
  if (_.findIndex(errors, errorMessage) == -1) {
    dispatch(action(types.PUSH_ERROR, errorMessage));
  }
};
export const popError = () => action(types.POP_ERROR);

export const updateOnFirebase = (dispatch, heartRate) => {
  if (heartRate !== 0) {
    let date = moment().local().format('DD-MM-YYYY');
    let hour = moment().local().format('HH');
    let minute = moment().local().format('mm');
    log('updateOnFirebase: Start ');
    const item = { heartRate: heartRate, hour: hour + ':' + minute, date };
    firebase
      .database()
      .ref(`users/${DeviceInfo.getUniqueID()}/heartRates/${date}/${hour}`)
      .push()
      .set(item).catch((err)=>{
        log('updateOnFirebase: errore = ' + err.message);
        dispatch(action(types.PUSH_ERROR, {errorMessage: err.message }));
      });
    log('updateOnFirebase: End ');
  }
};
