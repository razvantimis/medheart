import * as types from '../actions/types';
import * as _ from 'lodash';

const INITIAL_STATE = {
  hashDevices: {},
  devices: [],
  selectedDeviceId: null,
  isConnected: false,
  isAuth: false,
  connectInProgress: false,
  authInProgress: false,
  scanning: false,
  heartRateMeasureInProgress: false,
  errors: [],
  needsAuth: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case types.START_SCAN:
    return {...state, scanning: true, state: types.DEVICE_STATE_SEARCH};
  case types.STOP_SCAN:
    return {...state, scanning: false};
  case types.DEVICE_FOUND:{
    let hashDevices = {...state.hashDevices}
    hashDevices[action.payload.id] = action.payload;

    let devices = _.toArray(hashDevices);

    _.remove(devices,(item) => item.name == undefined || item.name != 'MI Band 2' );

    return {...state, devices, hashDevices };
  }
  case types.DEVICE_STATE_CONNECTING: {
    return {...state, connectInProgress: true, isConnected: false }
  }
  case types.DEVICE_STATE_CONNECTED: {
    return {...state, connectInProgress: false, isConnected: true, selectedDeviceId: action.payload.selectedDeviceId }
  }
  case types.DEVICE_STATE_DISCONNECTED: {
    return {...state, isAuth: false, connectInProgress: false, isMonitoring: false,  isConnected: false, authInProgress: false}
  }
  case types.CHANGE_NEEDS_AUTH: {
    return {...state, needsAuth: action.payload.needsAuth}
  }
  case types.DEVICE_STATE_AUTH_STARTED:{
    return {...state, authInProgress: true, isAuth: false};
  }
  case types.DEVICE_STATE_AUTH_SUCCEEDED: {
    return {...state, isAuth: true, authInProgress: false}
  }
  case types.DEVICE_STATE_AUTH_FAILED: {
    return {...state, isAuth: false, authInProgress: false}
  }
  case types.START_HEART_RATE_MEASURE: {
    return {...state, heartRateMeasureInProgress: true}
  }
  case types.STOP_HEART_RATE_MEASURE: {
    return {...state, heartRateMeasureInProgress: false}
  }
 
  case types.CHANGE_AUTH: {
    return {...state, needsAuth: action.payload.auth}
  }
  case types.PUSH_ERROR:{
    let errors = [...state.errors];
    errors.push(action.payload.errorMessage);
    return {...state, errors: errors}
  }
  case types.POP_ERROR:{
    let errors = [...state.errors];
    errors.pop();
    return {...state, errors: errors}
  }
  case types.RESET_STATE: {
    return INITIAL_STATE;
  }
  default:
    return state;
  }
}
