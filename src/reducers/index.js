import { combineReducers } from 'redux';

import { BleReducer, HeartRateReducer } from '../heartRate';
import PredictDisease from './PredictDisease';
import Scenes from './Scenes';

export default combineReducers({
  ble: BleReducer,
  scenes: Scenes,
  heartRate: HeartRateReducer,
  predictDisease: PredictDisease
});