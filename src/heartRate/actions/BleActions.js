import * as types from './types';

export function startScan() {
  return {
    type: types.START_SCAN
  }
}

export function stopScan() {
  return {
    type: types.STOP_SCAN
  }
}

export function deviceFound(device) {
  return {
    type: types.DEVICE_FOUND,
    device: device
  }
}

export function updateServices(deviceIdentifier, services) {
  return {
    type: types.UPDATE_SERVICES,
    deviceIdentifier: deviceIdentifier,
    services: services,
  }
}

export function updateCharacteristic(deviceIdentifier, serviceUUID, characteristicUUID, characteristic) {
  return {
    type: types.UPDATE_CHARACTERISTIC,
    deviceIdentifier,
    serviceUUID,
    characteristicUUID,
    characteristic
  }
}

export function writeCharacteristic(deviceIdentifier, serviceUUID, characteristicUUID, base64Value) {
  return {
    type: types.WRITE_CHARACTERISTIC,
    deviceIdentifier: deviceIdentifier,
    serviceUUID: serviceUUID,
    characteristicUUID: characteristicUUID,
    base64Value: base64Value 
  }
}

export function readCharacteristic(deviceIdentifier, serviceUUID, characteristicUUID) {
  return {
    type: types.READ_CHARACTERISTIC,
    deviceIdentifier: deviceIdentifier,
    serviceUUID: serviceUUID,
    characteristicUUID: characteristicUUID 
  }
}

export function monitorCharacteristic(deviceIdentifier, serviceUUID, characteristicUUID, monitor) {
  return {
    type: types.MONITOR_CHARACTERISTIC,
    deviceIdentifier,
    serviceUUID,
    characteristicUUID,
    monitor
  }
}


export function changeDeviceState(deviceIdentifier, state) {
  return {
    type: types.CHANGE_DEVICE_STATE,
    deviceIdentifier: deviceIdentifier,
    state: state
  }
}

export function selectService(deviceIdentifier, serviceUUID) {
  return {
    type: types.SELECT_SERVICE,
    deviceIdentifier: deviceIdentifier,
    serviceUUID: serviceUUID
  }
}

export function selectCharacteristic(deviceIdentifier, serviceUUID, characteristicUUID) {
  return {
    type: types.SELECT_CHARACTERISTIC,
    deviceIdentifier: deviceIdentifier,
    serviceUUID: serviceUUID,
    characteristicUUID: characteristicUUID
  }
}

export function pushError(errorMessage) {
  return {
    type:  types.PUSH_ERROR,
    errorMessage
  }
}

export function popError() {
  return {
    type: types.POP_ERROR,
  }
}

export function executeTransaction(transactionId) {
  return {
    type: types.EXECUTE_TRANSACTION,
    transactionId,
  }
}

export function completeTransaction(transactionId) {
  return {
    type: types.COMPLETE_TRANSACTION,
    transactionId
  }
}