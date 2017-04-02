import { combineReducers } from 'redux';
import SceneReducer from './SceneReducer';
import { BleReducer } from '../heartRate';

export default combineReducers({
  ble: BleReducer,
  route: SceneReducer
});