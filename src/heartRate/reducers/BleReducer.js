import * as types from '../actions/types';
import * as _ from 'lodash';

const INITIAL_STATE = {
  devices: [
    {
      id: 'FF:EF:61:C2:34:84',
      isConnectable: null,
      name: 'MI Band 2 Razvan',
      rssi: -68
    },
    {
      id: 'F0:54:E9:F6:46:1A',
      isConnectable: null,
      name: 'MI Band 2 Alex',
      rssi: -62
    }],
  deviceIdentifier: null,
  scanning: false,
  errors: [],
  state: types.DEVICE_STATE_DISCONNECTED,
  operations: [],
  transactionId: 0,
  needsAuth: true,
  tryDisconected: 0
}

export default (state = INITIAL_STATE, action) => {
  const transactionId = state.transactionId;

  switch (action.type) {
  case types.START_SCAN:
    return {...state, scanning: true, state: types.DEVICE_STATE_SEARCH};
  case types.STOP_SCAN:
    return {...state, scanning: false};
  case types.DEVICE_FOUND:{
    let devices = _.unionBy(state.devices, [action.device],'id');
    _.remove(devices,(item) => item.name == undefined);
    return {...state,devices: devices };
  }
  case types.CHANGE_DEVICE_STATE:
    return {...state, scanning: false, state: action.state, deviceIdentifier: !action.deviceIdentifier? state.deviceIdentifier : action.deviceIdentifier }
  case types.WRITE_CHARACTERISTIC:{
    let transaction = {
      type: 'write',
      state: 'new',
      deviceIdentifier: action.deviceIdentifier,
      serviceUUID: action.serviceUUID,
      characteristicUUID: action.characteristicUUID,
      base64Value: action.base64Value,
      transactionId
    };
    let operations = [...state.operations];
    operations.push(transaction);

    return {...state, operations,transactionId: transactionId + 1  }
  }
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
  case types.EXECUTE_TRANSACTION:
      //return state.setIn(['operations', action.transactionId, 'state'], 'inProgress');
    return state
  case types.COMPLETE_TRANSACTION:{
    let operations = [...state.operations];
    _.remove(operations,(item) => item.transactionId == action.transactionId);
    return {...state, operations}
  }
  case types.CHANGE_AUTH: {
    return {...state, needsAuth: action.payload.auth}
  }

      
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
