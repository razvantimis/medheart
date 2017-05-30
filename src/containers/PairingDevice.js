import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Spinner
} from 'native-base';

import { startAuthToMiBand2 } from '../actions/bluetooth';


class PairingDevice extends Component {
  static propTypes = {
    startAuthToMiBand2: PropTypes.func.isRequired
  }
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


const mapStateToProps = (state) => {
  return { 
  }
}


export default connect(mapStateToProps, {
  startAuthToMiBand2
})(PairingDevice);