import { combineReducers } from 'redux';

import { BleReducer, HeartRateReducer } from '../heartRate';
import { PredictDiseaseReducer } from '../predictDisease';

export default combineReducers({
  ble: BleReducer,
  heartRate: HeartRateReducer,
  predictDisease: PredictDiseaseReducer
});