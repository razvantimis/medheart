import { StackNavigator } from 'react-navigation';

import ScannedDevicesContainer from '../containers/ScannedDevices';
import PairingDeviceContainer from '../containers/PairingDevice';
import HeartMonitorContainer from '../containers/HeartMonitor';

export const HeartMonitor = StackNavigator({
  scannDevices: { screen: ScannedDevicesContainer },
  pairingDevice: { screen: PairingDeviceContainer },
  heartMonitor: { screen: HeartMonitorContainer },
},{
  headerMode: 'none',
});

export default HeartMonitor;