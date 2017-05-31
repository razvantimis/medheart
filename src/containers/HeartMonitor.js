import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import {
    Container,
    Content
} from 'native-base';
import Heart from '../components/Heart';
import BarChart from '../components/BarChart';

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
            <View style={styles.heart}>
              <TouchableOpacity onPress={()=>this.props.heartRateMeasure()}>
                 <Heart scale={10} value={this.props.heartRate.toString()}/>
              </TouchableOpacity>
            </View>
            <BarChart />
        </Content>
    </Container>
    );
  }
}
const styles = StyleSheet.create({
  heart: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    flex:1,
    flexDirection: 'column',
    alignItems:'center'
  },
});

const mapStateToProps = (state) => {
  return { 
    heartRate: state.heart.heartRate
  }
}

export default connect(mapStateToProps, {
  heartRateMeasure
})(HeartMonitor);