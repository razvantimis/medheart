import React, { Component, PropTypes } from 'react';
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
  constructor(props) {
    super(props);
  }

  _renderScannedDeviceCell(rowData) {
    const connectToDevice = () => {
      this.props.changeScene(this.props.scene);
      this.props.changeDeviceState(rowData.id,this.props.nextDeviceState)
    }
    return <ScannedDeviceView name={rowData.name} id={rowData.id} rssi={rowData.rssi} onClick={connectToDevice} />;
  }

  render() {
    return (
      <Container>
        <Content>
          <ErrorBluetooth />
          <List
            dataArray={this.props.devices}
            renderRow={this._renderScannedDeviceCell.bind(this)} />
        </Content>
        <Footer>
          <FooterTab style={redTheme.footerTab}>
            <Button
              style={this.props.scanning? redTheme.footerTabButtonActive : redTheme.footerTabButton}
              active={this.props.scanning}
              onPress={this.props.startScan}>
              <Text style={redTheme.footerTabText}>Scann</Text>
            </Button>
            <Button
              style={!this.props.scanning? redTheme.footerTabButtonActive : redTheme.footerTabButton}
              onPress={this.props.stopScan}
              active={!this.props.scanning}>
              <Text style={redTheme.footerTabText}>Stop</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
ScannedDevices.propTypes = {
  devices: PropTypes.array.isRequired,
  scanning: PropTypes.bool.isRequired,
  startScan: PropTypes.func.isRequired,
  stopScan: PropTypes.func.isRequired,
  changeDeviceState: PropTypes.func.isRequired,
  changeScene: PropTypes.func.isRequired,
  nextDeviceState: PropTypes.string.isRequired,
  scene: PropTypes.string.isRequired
}


export default ScannedDevices;
