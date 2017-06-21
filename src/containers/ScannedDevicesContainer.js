import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    startScan,
    stopScan,
    conectToDevice
} from '../actions/bluetoothActions'

import {
  Container,
  Content,
  List,
  Button,
  Text,
  Footer,
  FooterTab
} from 'native-base';

import ScannedDeviceView from '../components/ScannedDeviceView';
import redTheme from '../themes/redTheme';
import ErrorBluetooth from './ErrorBluetooth';


class ScannedDevices extends Component {
  static propTypes = { devices: PropTypes.array.isRequired,
    scanning: PropTypes.bool.isRequired,
    isConnected: PropTypes.bool.isRequired,
    startScan: PropTypes.func.isRequired,
    stopScan: PropTypes.func.isRequired,
    conectToDevice: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    if(this.props.isConnected){
      this.props.navigation.navigate('pairingDevice');
    }
  }

  _renderScannedDeviceCell(rowData) {
    const connectToDevice = () => {
      this.props.stopScan();
      this.props.navigation.navigate('pairingDevice');
      this.props.conectToDevice(rowData.id, this.props.navigation);
    }
    return <ScannedDeviceView name={rowData.name} id={rowData.id} rssi={rowData.rssi} onClick={connectToDevice.bind(this)} />;
  }

  render() {
    const { scanning, startScan, stopScan, devices} = this.props;

    return (
      <Container>
        <Content>
          <ErrorBluetooth />
          <List
            dataArray={devices}
            renderRow={this._renderScannedDeviceCell.bind(this)} />
        </Content>
        <Footer>
          <FooterTab style={redTheme.footerTab}>
            <Button
              style={scanning? redTheme.footerTabButtonActive : redTheme.footerTabButton}
              active={scanning}
              onPress={()=> startScan()}>
              <Text style={redTheme.footerTabText}>Scanare</Text>
            </Button>
            <Button
              style={!scanning? redTheme.footerTabButtonActive : redTheme.footerTabButton}
              onPress={stopScan.bind(this)}
              active={!scanning}>
              <Text style={redTheme.footerTabText}>Opriți</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    devices: state.ble.devices,
    scanning: state.ble.scanning,
    isConnected: state.ble.isConnected
  }
}

export default connect(mapStateToProps, {
  startScan,
  stopScan,
  conectToDevice
})(ScannedDevices);
