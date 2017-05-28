import React, { Component } from 'react';

import {
    Container,
    Content
} from 'native-base';

import Heart from '../../common/Heart';

class MonitoringHeart extends Component {

  render(){

    return (
    <Container>
        <Content>
            <Heart scale={10}  precent='10'/>
        </Content>
    </Container>
    );
  }
}

export default MonitoringHeart;