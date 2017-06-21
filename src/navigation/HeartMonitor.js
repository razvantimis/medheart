import { StackNavigator } from 'react-navigation';

import ScannedDevicesContainer from '../containers/ScannedDevicesContainer';
import PairingDeviceContainer from '../containers/PairingDeviceContainer';
import HeartMonitorContainer from '../containers/HeartMonitorContainer';
import InfoMonitoringContainer from '../containers/InfoMonitoringContainer';

export const HeartMonitor = StackNavigator({
  scannDevices: { screen: ScannedDevicesContainer },
  pairingDevice: { screen: PairingDeviceContainer },
  heartMonitor: { screen: HeartMonitorContainer },
  infoMonitoring: { screen: InfoMonitoringContainer}
},{
  headerMode: 'none',
  initialRouteName: 'infoMonitoring'
});

export default HeartMonitor;