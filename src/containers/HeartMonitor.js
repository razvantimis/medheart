import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native';
import {
    Container,
    Content
} from 'native-base';
import Heart from '../components/Heart';

import { heartRateMeasure } from '../actions/bluetoothActions';

class HeartMonitor extends Component {
  static propTypes = {
    heartRate: PropTypes.number.isRequired,
    heartRateMeasure: PropTypes.func.isRequired
  }

  render(){
    return (
    <Container>
        <Content>
            <TouchableOpacity onPress={()=>this.props.heartRateMeasure()}>
                <Heart scale={10}  value={this.props.heartRate.toString()}/>
            </TouchableOpacity>
        </Content>
    </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    heartRate: state.heart.heartRate
  }
}


export default connect(mapStateToProps, {
  heartRateMeasure
})(HeartMonitor);