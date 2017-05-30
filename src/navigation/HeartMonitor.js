import { StackNavigator } from 'react-navigation';
import ScannedDevices from '../containers/ScannedDevices';

export const HeartMonitor = StackNavigator({
  scannDevicesScreen: { screen: ScannedDevices }
},{
  headerMode: 'none',
});

export default HeartMonitor;