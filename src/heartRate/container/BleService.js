import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { BleManager } from 'react-native-ble-plx';
import * as actions from '../actions';
import * as types from '../actions/types';
import * as consts from '../constants';
import base from 'base64-js';

import crypto from 'crypto-js'

import { NativeModules } from 'react-native';
let CipherModule = NativeModules.CipherModule;

class BleService extends Component {
  componentWillMount() {
    this.manager = new BleManager();
    this.subscriptions = {}
    this.authMonitor = null;
    this.heartMonitoring = null;
    this.manager.onStateChange((newState) => {
      console.log('State changed: ' + newState)
    })
  }

  componentWillUnmount() {
    this.manager.destroy();
    delete this.manager;
  }



  componentWillReceiveProps(newProps) {
    // Handle connection state
    switch (newProps.state) {
    case types.DEVICE_STATE_SEARCH: {
      this.searchDevices(newProps);
      break;
    }
    case types.DEVICE_STATE_DISCONNECT:{
      this.manager.cancelDeviceConnection(newProps.selectedDeviceId)
          .then((successIdentifier) => {
            newProps.changeDeviceState(successIdentifier, types.DEVICE_STATE_DISCONNECTED);
          }, (rejected) => {
            if (rejected.message !== 'Cancelled') {
              newProps.pushError(rejected.message)
            }
            newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_DISCONNECTED);
          });

      newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_DISCONNECTING);
      break;
    }
    case types.DEVICE_STATE_CONNECT:{
      
      this.manager.connectToDevice(newProps.selectedDeviceId)
          .then((device) => {
            this.subscriptions[device.uuid] = device.onDisconnected((error, disconnectedDevice) => {
              newProps.pushError('Disconnected from ' + (disconnectedDevice.name ? disconnectedDevice.name : disconnectedDevice.uuid))
              newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_DISCONNECTED);
              this.subscriptions[device.uuid].remove()  
            });

            newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_DISCOVERING);
            var promise = device.discoverAllServicesAndCharacteristics();
            newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_CONNECTED);
            return promise
          }).then(()=>{
            newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_AUTH);
          },(rejected) => {
            newProps.pushError(rejected.message)
            newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_DISCONNECTED);
          });
      //newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_CONNECTING);
      break;
    }
    case types.DEVICE_STATE_AUTH:{
      this.authMonitor = this.manager.monitorCharacteristicForDevice(newProps.selectedDeviceId, consts.UUID_SERVICE_MIBAND2_SERVICE, consts.UUID_CHARACTERISTIC_AUTH, 
        (error, characteristic) => {
          console.log(characteristic);
          console.log(error);
          let data = base.toByteArray(characteristic.value);
          console.log(data);

          if(data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_SEND_KEY && data[2] == consts.AUTH_SUCCESS){
            console.log('Sending the secret key to the band');
            let send = base.fromByteArray(consts.requestAuthNumber)
            characteristic.writeWithoutResponse(send, '2')
              .then((characteristic)=> {
                let data = base.toByteArray(characteristic.value);
                console.log(data);
              }).catch((err)=> console.log(err));
            
          } else if (data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_REQUEST_RANDOM_AUTH_NUMBER && data[2] == consts.AUTH_SUCCESS){
            // sending the encrypted random key to the band with 2 action
            console.log('sending the encrypted random key to the band with 2 action');
            

            let rezultat = '[';
            for(let i= 0; i < data.byteLength; i++)
            {
              if( i > 0 )
                rezultat += ', ';
              rezultat += data[i];
            }
            rezultat += ']';
            

            CipherModule.handleAESAuth(rezultat, JSON.stringify(consts.SECRET_KEY),
            (status) => {
              let eValue = new Uint8Array(JSON.parse(status));
              let send = new Uint8Array([ consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER, consts.AUTH_BYTE, ...eValue ]);
              console.log(eValue);
              console.log(send);

              send = base.fromByteArray(send);
              characteristic.writeWithoutResponse(send, '3').then((c1)=> {
                console.log(c1 );
                let data = base.toByteArray(c1.value);
                console.log(data);
              }).catch((err)=> console.log(err));
              
            });
          } else if (data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER && data[2] == consts.AUTH_SUCCESS){
            console.log('Succes auth');
            newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_AUTH_SUCCES);
            newProps.changeAuth(false);
          } else if (data[0] == consts.AUTH_RESPONSE && data[1] == consts.AUTH_SEND_ENCRYPTED_AUTH_NUMBER && data[2] == consts.AUTH_FAIL){
            console.log('Auth faild');
          
            // newProps.changeDeviceState(newProps.selectedDeviceId, types.DEVICE_STATE_DISCONNECT);
            // newProps.changeAuth(true);
            // newProps.pushError('Auth faild!');
          }
        },'1');

      if(newProps.needsAuth){
        // first pass
        let data = base.fromByteArray(consts.sendKey)
        this.manager.writeCharacteristicWithoutResponseForDevice(newProps.selectedDeviceId, consts.UUID_SERVICE_MIBAND2_SERVICE, consts.UUID_CHARACTERISTIC_AUTH, data, '11')
        .then((characteristic)=> {
          console.log(characteristic );
          let data = base.toByteArray(characteristic.value);
          console.log(data);
        }).catch((err)=> console.log(err));
      } else {
        console.log('Sending the secret key to the band');
        let send = base.fromByteArray(consts.requestAuthNumber)
        this.manager.writeCharacteristicWithoutResponseForDevice(newProps.selectedDeviceId, consts.UUID_SERVICE_MIBAND2_SERVICE, consts.UUID_CHARACTERISTIC_AUTH,send, '12')
          .then((characteristic)=> {
            let data = base.toByteArray(characteristic.value);
            console.log(data);
          }).catch((err)=> console.log(err));
      }
    
      break
    }
    case types.START_HEART_RATE_MONITORING: {
      
    }
    }

    
    
    // Handle operations
    newProps.operations.forEach((value, key) => {
      const state = value.state;
      const deviceId = value.deviceIdentifier;
      const serviceId = value.serviceUUID;
      const characteristicId = value.characteristicUUID;
      const base64Value = value.base64Value;
      const type = value.type;
      const transactionId = value.transactionId;

      switch (type) {
      case 'read':
        if (state !== 'new') return true
        this.manager.readCharacteristicForDevice(deviceId,
                                                   serviceId,
                                                   characteristicId)
            .then((characteristic) => {
              newProps.completeTransaction(transactionId)
              newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { value: characteristic.value })
            }, (rejected) => {
              newProps.pushError(rejected.message)
              newProps.completeTransaction(transactionId)
            });
        newProps.executeTransaction(transactionId)
        break;

      case 'write':
        if (state !== 'new') return true;

        this.manager.writeCharacteristicWithResponseForDevice(deviceId,
                                                                serviceId,
                                                                characteristicId,
                                                                base64Value)
            .then((characteristic) => {
              console.log(characteristic);
              newProps.completeTransaction(transactionId)
              newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { value: characteristic.value })
            }, (rejected) => {
              newProps.pushError(rejected.message)
              newProps.completeTransaction(transactionId)
            });
        newProps.executeTransaction(transactionId)
        break;

      case 'monitor':
        if (state === 'new') {
          newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { isNotifying: true })
          this.manager.monitorCharacteristicForDevice(deviceId,
                                                        serviceId,
                                                        characteristicId,
                                                        (error, characteristic) => {
                                                          if (error) {
                                                            if (error.message === 'Cancelled') return
                
                                                            newProps.pushError(error.message)
                                                            newProps.completeTransaction(transactionId)
                                                            return
                                                          }

                                                          newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { value: characteristic.value })
                                                        }, transactionId)
          newProps.executeTransaction(transactionId)
        } else if (state === 'cancel') {
          this.manager.cancelTransaction(transactionId)
          newProps.updateCharacteristic(deviceId, serviceId, characteristicId, { isNotifying: false })
          newProps.completeTransaction(transactionId)
        }
        break;
      }

      return true
    })
  }
  searchDevices(newProps){
    if (newProps.scanning !== this.props.scanning) {
      if (newProps.scanning === true) {       
        this.manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            newProps.pushError(error.message)
            newProps.stopScan()
            return
          }
          newProps.deviceFound({
            id: device.id,
            name: device.name,
            rssi: device.rssi,
            isConnectable: device.isConnectable
          })
        });
      } else {
        this.manager.stopDeviceScan();
      }
    }
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
    return (<Text style={{display: 'none'}}> </Text>);
  }
  handleAESAuth(data, SECRET_KEY){
    let mValue = data.slice(3, 19);
    // Cipher ecipher = Cipher.getInstance("AES/ECB/NoPadding");
    //     SecretKeySpec newKey = new SecretKeySpec(secretKey, "AES");
    //     ecipher.init(Cipher.ENCRYPT_MODE, newKey);
    //     byte[] enc = ecipher.doFinal(mValue);
    crypto.enc.u8array = {
        /**
         * Converts a word array to a Uint8Array.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {Uint8Array} The Uint8Array.
         *
         * @static
         *
         * @example
         *
         *     var u8arr = CryptoJS.enc.u8array.stringify(wordArray);
         */
      stringify: function (wordArray) {
            // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

            // Convert
        var u8 = new Uint8Array(sigBytes);
        for (var i = 0; i < sigBytes; i++) {
          var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
          u8[i]=byte;
        }

        return u8;
      },

        /**
         * Converts a Uint8Array to a word array.
         *
         * @param {string} u8Str The Uint8Array.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.u8array.parse(u8arr);
         */
      parse: function (u8arr) {
            // Shortcut
        var len = u8arr.length;

            // Convert
        var words = [];
        for (var i = 0; i < len; i++) {
          words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
        }

        return crypto.lib.WordArray.create(words, len);
      }
    };

    let key = crypto.enc.u8array.parse(mValue);
    let encrypted = crypto.enc.u8array.parse(SECRET_KEY);
    let ret = crypto.AES.encrypt(encrypted, key, {  mode: crypto.mode.ECB, padding: crypto.pad.NoPadding});
   
    return crypto.enc.u8array.stringify(ret.ciphertext);
  }
}

export default connect(
  state => ({
    operations: state.ble.operations,
    scanning: state.ble.scanning,
    state: state.ble.state,
    needsAuth: state.ble.needsAuth,
    selectedDeviceId: state.ble.deviceIdentifier,
    tryDisconected: state.ble.tryDisconected
  }),
  {
    deviceFound: actions.deviceFound,
    changeDeviceState: actions.changeDeviceState,
    serviceIdsForDevice: actions.serviceIdsForDevice,
    stopScan: actions.stopScan,
    updateServices: actions.updateServices,
    updateCharacteristic: actions.updateCharacteristic,
    executeTransaction: actions.executeTransaction,
    completeTransaction: actions.completeTransaction,
    pushError: actions.pushError,
    changeAuth: actions.changeAuth,
    incrementTryDisconected: actions.incrementTryDisconected,
    updateHeartRate: actions.updateHeartRate
  })(BleService)
