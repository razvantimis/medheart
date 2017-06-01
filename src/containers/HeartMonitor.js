import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import {
    Container,
    Content
} from 'native-base';
import Heart from '../components/Heart';
import BarChart from '../components/BarChart';
import { heartRateMeasure } from '../actions/bluetoothActions';
import { updateChart } from '../actions/heartMonitorActions';

import {
  getLogger
} from '../core/utils'

import BackgroundJob from 'react-native-background-job';

const log = getLogger('HeartMonitorContainer');

class HeartMonitor extends Component {
  static propTypes = {
    heartRate: PropTypes.number.isRequired,
    heartRateMeasure: PropTypes.func.isRequired,
    updateChart: PropTypes.func.isRequired,
    dataChart: PropTypes.array.isRequired
  }
  componentWillMount(){
    BackgroundJob.cancelAll();
    this.props.updateChart();
    this.props.heartRateMeasure();
    log('create task background');
    const backgroundJobHeartRate = {
      jobKey: 'heartRate',
      job: () =>{
        this.props.heartRateMeasure();
        log('Running in background heart rate');
      }
    };

    const backgroundJobChart = {
      jobKey: 'chart',
      job: () =>{
        this.props.updateChart();
        log('Running in background update chart');
      }
    };
    log('register task background');
    BackgroundJob.register(backgroundJobHeartRate);
    BackgroundJob.register(backgroundJobChart);

    var backgroundScheduleHeartRate = {
      jobKey: 'heartRate',
      timeout: 30000,//60000 = 1 min
      period: 60000*3,
    }
  
    var backgroundScheduleChart = {
      jobKey: 'chart',
      timeout: 30000,//60000 = 1 min
      period: 60000*3,
    }
    log('create schedule background');
    BackgroundJob.schedule(backgroundScheduleHeartRate);
    BackgroundJob.schedule(backgroundScheduleChart);
  }
  componentWillUnmount() {
    BackgroundJob.cancelAll(); 
  }

  render(){
    const { dataChart } = this.props;
    log(JSON.stringify(dataChart))
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
    flex:1,
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
  updateChart
})(HeartMonitor);