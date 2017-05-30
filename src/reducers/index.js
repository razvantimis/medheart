import { combineReducers } from 'redux';

import HeartMonitor from './HeartMonitor';
import Bluetooth from './Bluetooth';
import PredictDisease from './PredictDisease';
import Navigation from './Navigation';

export default combineReducers({
  ble: Bluetooth,
  nav: Navigation,
  heartRate: HeartMonitor,
  predictDisease: PredictDisease
});