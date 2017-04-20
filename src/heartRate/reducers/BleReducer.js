import * as types from '../actions/types';
import * as _ from 'lodash';

const INITIAL_STATE = {
  devices: [],
  selecteddeviceIdentifier: null,
  scanning: false,
  errors: [],
  state: types.DEVICE_STATE_DISCONNECTED,
  operations: [],
  transactionId: 0
}

export default (state = INITIAL_STATE, action) => {
    const transactionId = state.transactionId;

  switch (action.type) {
    case types.START_SCAN:
      return {...state, scanning: true};
    case types.STOP_SCAN:
      return {...state, scanning: false};
    case types.DEVICE_FOUND:
      let devices = _.unionBy(state.devices, [action.device],'id');
      _.remove(devices,(item) => item.name == undefined);
      return {...state,devices: devices };
    case types.CHANGE_DEVICE_STATE:
      return {...state, scanning: false, state: action.state, selectedDevicedId: action.deviceIdentifier? state.deviceIdentifier : action.deviceIdentifier }
      
     
    // case types.WRITE_CHARACTERISTIC:
    //   return state.withMutations(state => {
    //     state.setIn(['operations', transactionId], Map({
    //       type: 'write',
    //       state: 'new',
    //       deviceIdentifier: action.deviceIdentifier,
    //       serviceUUID: action.serviceUUID,
    //       characteristicUUID: action.characteristicUUID,
    //       base64Value: action.base64Value,
    //       transactionId
    //     })).set('transactionId', transactionId + 1);
    //   }); 
    // case types.READ_CHARACTERISTIC:
    //   return state.withMutations(state => {
    //     state.setIn(['operations', transactionId], Map({
    //       type: 'read',
    //       state: 'new',
    //       deviceIdentifier: action.deviceIdentifier,
    //       serviceUUID: action.serviceUUID,
    //       characteristicUUID: action.characteristicUUID,
    //       transactionId
    //     })).set('transactionId', transactionId + 1);
    //   });
    // case types.MONITOR_CHARACTERISTIC:
    //   const id = action.deviceIdentifier + " " + action.serviceUUID + " " + action.characteristicUUID
    //   if (!action.monitor) {
    //     return state.setIn(['operations', id, 'state'], 'cancel')
    //   }
    //   return state.setIn(['operations', id], Map({
    //       type: 'monitor',
    //       state: 'new',
    //       deviceIdentifier: action.deviceIdentifier,
    //       serviceUUID: action.serviceUUID,
    //       characteristicUUID: action.characteristicUUID,
    //       transactionId: id
    //     }));
    // case types.EXECUTE_TRANSACTION:
    //   return state.setIn(['operations', action.transactionId, 'state'], 'inProgress');
    // case types.COMPLETE_TRANSACTION:
    //   return state.removeIn(['operations', action.transactionId])
    case types.PUSH_ERROR:
      let errors = [...state.errors];
      errors.push(action.errorMessage);
      return {...state, errors: errors}
    case types.POP_ERROR:
      errors = [...state.errors];
      errors.pop();
      return {...state, errors: errors}
    default:
      return state;
  }
}
