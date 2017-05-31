import { combineReducers } from 'redux';

import HeartMonitor from './HeartMonitorReducer';
import Bluetooth from './BluetoothReducer';
import PredictDisease from './PredictDiseaseReducer';
import Navigation from './NavigationReducer';

export default combineReducers({
  ble: Bluetooth,
  nav: Navigation,
  heart: HeartMonitor,
  predictDisease: PredictDisease
});