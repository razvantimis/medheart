import React, { Component, PropTypes } from 'react';
import {getLogger } from '../core/utils';
import { connect } from 'react-redux'
import { StyleSheet, View, AppState } from 'react-native';
import {
    Container,
    Content
} from 'native-base';
import Heart from '../components/Heart';
import BarChart from '../components/BarChart';
import { heartRateMeasure } from '../actions/bluetoothActions';
import { updateChart, startTaskBackground, stopTaskBackground } from '../actions/heartMonitorActions';
import { disconnectFromDevice } from '../actions/bluetoothActions';
import TimerMixin from 'react-timer-mixin';

import * as consts from '../core/constantsTask';
const log = getLogger('HeartMonitor');

class HeartMonitor extends Component {

  state = {
    appState: AppState.currentState
  }

  static propTypes = {
    heartRate: PropTypes.number.isRequired,
    heartRateMeasure: PropTypes.func.isRequired,
    startTaskBackground: PropTypes.func.isRequired,
    stopTaskBackground: PropTypes.func.isRequired,
    updateChart: PropTypes.func.isRequired,
    disconnectFromDevice: PropTypes.func.isRequired,
    dataChart: PropTypes.array.isRequired
  }
  _handleAppStateChange = (nextAppState) => {
    // if (this.state.nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
    //   log(this.state.appState);

    // } else if (this.state.appState.match(/inactive|background/) && nextAppState === 'active'){
    //   this.props.stopTaskBackground(consts.heartRateTask);
    // }
    log(nextAppState)
    this.setState({appState: nextAppState});
  }
  componentDidMount() {
    this.props.stopTaskBackground(consts.heartRateTask);
    this.props.startTaskBackground(consts.heartRateTask, ()=> this.props.heartRateMeasure(), consts.periodHeart);
    AppState.addEventListener('change', this._handleAppStateChange);
    this.intervalHeart = TimerMixin.setInterval(
      () => this.props.heartRateMeasure(),
      consts.periodHeart
    );
    this.intervalChart = TimerMixin.setInterval(
      () => this.props.updateChart(),
      consts.periodChart
    );
    this.props.heartRateMeasure()
  }
  componentWillMount(){
   
    this.props.updateChart();
  }
  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange);
    TimerMixin.clearInterval(this.intervalChart);
    TimerMixin.clearInterval(this.intervalHeart);
  }
  render(){
    const { dataChart } = this.props;
    return (
    <Container>
        <Content>
            <View style={styles.heart}>
              <Heart scale={10} value={this.props.heartRate.toString()}/>
            </View>

            { dataChart && dataChart.length == 4 && <BarChart data={dataChart} accessorKey='heartRate' /> }
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
    flex: 1,
    flexDirection: 'column',
    alignItems:'center'
  },
});



const mapStateToProps = (state) => {
  return { 
    heartRate: state.heart.heartRateNow,
    dataChart: state.heart.dataChart
  }
}

export default connect(mapStateToProps, {
  heartRateMeasure,
  updateChart,
  disconnectFromDevice,
  startTaskBackground,
  stopTaskBackground
})(HeartMonitor);