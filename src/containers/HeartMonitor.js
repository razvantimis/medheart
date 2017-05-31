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
import { updateChart } from '../actions/heartMonitorActions';

import BackgroundJob from 'react-native-background-job';



class HeartMonitor extends Component {
  static propTypes = {
    heartRate: PropTypes.number.isRequired,
    heartRateMeasure: PropTypes.func.isRequired,
    updateChart: PropTypes.func.isRequired,
    dataChart: PropTypes.array.isRequired
  }
  componentWillMount(){
    
    const backgroundJobHeartRate = {
      jobKey: 'heartRate',
      job: () =>{
        this.props.heartRateMeasure();
        console.log('Running in background heart rate');
      }
    };

    const backgroundJobChart = {
      jobKey: 'chart',
      job: () =>{
        this.props.updateChart();
        console.log('Running in background update chart');
      }
    };
    BackgroundJob.register(backgroundJobHeartRate);
    BackgroundJob.register(backgroundJobChart);

    var backgroundScheduleHeartRate = {
      jobKey: 'heartRate',
      timeout: 60000*10
    }
  
    var backgroundScheduleChart = {
      jobKey: 'chart',
      timeout: 60000*3
    }

    BackgroundJob.schedule(backgroundScheduleHeartRate);
    BackgroundJob.schedule(backgroundScheduleChart);
  }

  render(){
    const { dataChart } = this.props;
    return (
    <Container>
        <Content>
            <View style={styles.heart}>
              <Heart scale={10} value={this.props.heartRate.toString()}/>
            </View>
            <BarChart data={dataChart} accessorKey='heartRate' />
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