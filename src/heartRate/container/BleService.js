import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BleManager } from 'react-native-ble-plx';
import * as bleActions from '../actions/BleActions';
import * as types from '../actions/types';

class BleService extends Component {
  componentWillMount() {
    this.manager = new BleManager();
    this.subscriptions = {}
    this.manager.onStateChange((newState) => {
      console.log("State changed: " + newState)
    })
  }

  componentWillUnmount() {
    this.manager.destroy();
    delete this.manager;
  }

  componentWillReceiveProps(newProps) {
    // Handle scanning
    if (newProps.scanning !== this.props.scanning) {
      if (newProps.scanning === true) {
        console.log('start scann');
        this.manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            newProps.pushError(error.message)
            newProps.stopScan()
            return
          }
          console.log(device);
          newProps.deviceFound({
            id: device.id,
            name: device.name,
            rssi: device.rssi,
            isConnectable: device.isConnectable
          })
        })
      } else {
        this.manager.stopDeviceScan();
      }
    }

    // Handle connection state
    switch (newProps.state) {
      case types.DEVICE_STATE_DISCONNECT:
        this.manager.cancelDeviceConnection(newProps.selectedDeviceId)
          .then((successIdentifier) => {
            newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_DISCONNECTED);
          }, (rejected) => {
            if (rejected.message !== "Cancelled") {
              newProps.pushError(rejected.message)
            }
            newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_DISCONNECTED);
          });
        newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_DISCONNECTING);
        break;

      case types.DEVICE_STATE_CONNECT:
        this.manager.connectToDevice(newProps.selectedDeviceId)
          .then((device) => {
            this.subscriptions[device.uuid] = device.onDisconnected((error, disconnectedDevice) => {
              newProps.pushError("Disconnected from " + (disconnectedDevice.name ? disconnectedDevice.name : disconnectedDevice.uuid))
              newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_DISCONNECTED);
              this.subscriptions[device.uuid].remove()  
            })

            newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_DISCOVERING);
            var promise = device.discoverAllServicesAndCharacteristics() 
            return promise
          })
          .then((device) => {
            newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_FETCHING);
            return this.fetchServicesAndCharacteristicsForDevice(device)
          })
          .then((services) => {
            newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_CONNECTED);
            newProps.updateServices(newProps.selectedDeviceId, services);
          },
          (rejected) => {
            newProps.pushError(rejected.message)
            newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_DISCONNECTED);
          });

        newProps.changeDeviceState(newProps.selectedDeviceId, ble.DEVICE_STATE_CONNECTING);
        break;
    }

    // Handle operations
    // newProps.operations.forEach((value, key) => {
    //   const state = value.get('state')
    //   const deviceId = value.get('deviceIdentifier')
    //   const serviceId = value.get('serviceUUID')
    //   const characteristicId = value.get('characteristicUUID')
    //   const base64Value = value.get('base64Value')
    //   const type = value.get('type')
    //   const transactionId = value.get('transactionId')

    //   switch (type) {
    //     case 'read':
    //       if (state !== 'new') return true
    //       this.manager.readCharacteristicForDevice(deviceId,
    //                                                serviceId,
    //                                                characteristicId)
    //         .then((characteristic) => {
    //           newProps.completeTransaction(transactionId)
    //           newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { value: characteristic.value })
    //         }, (rejected) => {
    //           newProps.pushError(rejected.message)
    //           newProps.completeTransaction(transactionId)
    //         });
    //       newProps.executeTransaction(transactionId)
    //       break;

    //     case 'write':
    //       if (state !== 'new') return true
    //       this.manager.writeCharacteristicWithResponseForDevice(deviceId,
    //                                                             serviceId,
    //                                                             characteristicId,
    //                                                             base64Value)
    //         .then((characteristic) => {
    //           newProps.completeTransaction(transactionId)
    //           newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { value: characteristic.value })
    //         }, (rejected) => {
    //           newProps.pushError(rejected.message)
    //           newProps.completeTransaction(transactionId)
    //         });
    //       newProps.executeTransaction(transactionId)
    //       break;

    //     case 'monitor':
    //       if (state === 'new') {
    //         newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { isNotifying: true })
    //         this.manager.monitorCharacteristicForDevice(deviceId,
    //                                                     serviceId,
    //                                                     characteristicId,
    //                                                     (error, characteristic) => {
    //           if (error) {
    //             if (error.message === "Cancelled") return
                
    //             newProps.pushError(error.message)
    //             newProps.completeTransaction(transactionId)
    //             return
    //           }

    //           newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { value: characteristic.value })
    //         }, transactionId)
    //         newProps.executeTransaction(transactionId)
    //       } else if (state === 'cancel') {
    //         this.manager.cancelTransaction(transactionId)
    //         newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { isNotifying: false })
    //         newProps.completeTransaction(transactionId)
    //       }
    //       break;
    //   }

    //   return true
    // })
  }

  render() {
    return null;
  }
}

export default connect(
  state => ({
    operations: state.ble.operations,
    scanning: state.ble.scanning,
    state: state.ble.state,
    selectedDeviceId: state.ble.selectedDeviceId
  }),
  {
    deviceFound: bleActions.deviceFound,
    changeDeviceState: bleActions.changeDeviceState,
    serviceIdsForDevice: bleActions.serviceIdsForDevice,
    stopScan: bleActions.stopScan,
    updateServices: bleActions.updateServices,
    updateCharacteristic: bleActions.updateCharacteristic,
    executeTransaction: bleActions.executeTransaction,
    completeTransaction: bleActions.completeTransaction,
    pushError: bleActions.pushError
  })
  (BleService)
