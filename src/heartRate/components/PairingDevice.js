import React, { Component, PropTypes } from 'react';

import {
    Container,
    Content,
    Spinner
} from 'native-base';


class PairingDevice extends Component {
  static propTypes = {
    deviceState: PropTypes.string.isRequired,
    deviceFinalStep: PropTypes.string.isRequired,
    deviceDisconectedStep: PropTypes.string.isRequired,
    changeScene: PropTypes.func.isRequired,
    nextScene: PropTypes.string.isRequired,
    prevScene: PropTypes.string.isRequired
  }
  render(){
    const { deviceState, deviceFinalStep, changeScene, nextScene, prevScene, deviceDisconectedStep  } = this.props;
    
    if(deviceState==deviceFinalStep){
      changeScene(nextScene);
    } else if( deviceState == deviceDisconectedStep){
      changeScene(prevScene);
    }
    
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