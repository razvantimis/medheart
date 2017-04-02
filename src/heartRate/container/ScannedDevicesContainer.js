import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux'


import { Container, 
        Header,
        Title,
        Content, 
        List, 
        ListItem, 
        Footer, 
        FooterTab, 
        Button, 
        Icon, 
        Text, 
        Left, 
        Body, 
        Right,
        Thumbnail } from 'native-base';

import ScannedDeviceView from '../components/ScannedDeviceView'
import * as bleActions from '../actions/BleActions'
import { Actions } from 'react-native-router-flux'

class ScannedDevicesComponent extends Component {
  constructor(props){
    super(props);
   
  }

 
  _renderScannedDeviceCell(rowData) {
    const connectToDevice = () => {
      this.props.changeDeviceState(rowData.id, ble.DEVICE_STATE_CONNECT)
      // Actions[SceneConst.SERVICES_SCENE]();
    }
  
    return (
      <ListItem thumbnail>
          <Left>
              <Thumbnail square size={80} source={require('../img/miband2.png')} />
          </Left>
          <Body>
              <Text>{rowData.name}</Text>
              <Text note>Id: {rowData.id} Rssi: {rowData.rssi}</Text>
          </Body>
          <Right>
              <Button transparent>
                  <Text>Connect</Text>
              </Button>
          </Right>
      </ListItem>

    )
  }


  render() {
    return (
      <Container>
         <Header>
            <Body>
                <Title>Header</Title>
            </Body>
        </Header>
        <Content>
            <List 
              dataArray={this.props.devices}
              renderRow={this._renderScannedDeviceCell.bind(this)} /> 
            <Button 
                active={this.props.scanning}
                onPress={this.props.startScan}>
                  <Text>Scann</Text>
            </Button>
            <Button
                onPress={this.props.stopScan}
                active={!this.props.scanning}>
                  <Text>Stop</Text>
            </Button>
            </Content>
            <Footer >
              <FooterTab>
                  <Button onPress={()=>Actions.predictDisease()}>
                      <Text>PredictDisease</Text>
                  </Button>
                  <Button onPress={()=>Actions.heartRate()}>
                      <Text>Heart Rate</Text>
                  </Button>
                  
              </FooterTab>
            </Footer>
            
      </Container>
    )
  }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(
  state => ({
    devices: state.ble.devices,
    scanning: state.ble.scanning
  }),
  {
    startScan: bleActions.startScan,
    stopScan: bleActions.stopScan,
    changeDeviceState: bleActions.changeDeviceState
  })
(ScannedDevicesComponent);
