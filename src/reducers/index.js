import { combineReducers } from 'redux';
import SceneReducer from './SceneReducer';
import { BleReducer, HeartRateReducer } from '../heartRate';

export default combineReducers({
  ble: BleReducer,
  heartRate: HeartRateReducer,
  route: SceneReducer
});