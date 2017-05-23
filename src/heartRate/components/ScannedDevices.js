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

import ScannedDeviceView from './ScannedDeviceView';
import redTheme from '../../themes/redTheme';

class ScannedDevices extends Component {
  constructor(props) {
    super(props);
  }

  _renderScannedDeviceCell(rowData) {
    const connectToDevice = () => {
      this.props.changeDeviceState(rowData.id,this.props.state)
    }
    return <ScannedDeviceView name={rowData.name} id={rowData.id} rssi={rowData.rssi} onClick={connectToDevice} />;
  }

  render() {
    return (
      <Container>
        <Content>
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
  state: PropTypes.string.isRequired
}


export default ScannedDevices;
