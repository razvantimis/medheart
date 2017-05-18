import React, { Component } from 'react';

import {
    Container,
    Content,
    Spinner
} from 'native-base';

class PairingDevice extends Component {
    
  render(){
    return (
            <Container>
                <Content>
                    <Spinner color='red'></Spinner>
                </Content>
            </Container>
      );
  }
}

export default PairingDevice;