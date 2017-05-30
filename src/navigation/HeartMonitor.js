import { StackNavigator } from 'react-navigation';
import ScannedDevices from '../containers/ScannedDevices';
import PairingDevice from '../containers/PairingDevice';

export const HeartMonitor = StackNavigator({
  scannDevicesScreen: { screen: ScannedDevices },
  PairingDevice: { screen: PairingDevice }
},{
  headerMode: 'none',
});

export default HeartMonitor;