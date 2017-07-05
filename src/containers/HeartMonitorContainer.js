import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    List,
    ListItem
} from 'native-base';
import redTheme from '../themes/redTheme';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Heart from '../components/Heart';
import BarChart from '../components/BarChart';
import { heartRateMeasure } from '../actions/bluetoothActions';
import { updateChart, startTaskBackground, stopTaskBackground, monitoring, sendSms } from '../actions/heartMonitorActions';
import { disconnectFromDevice } from '../actions/bluetoothActions';
import TimerMixin from 'react-timer-mixin';

import * as consts from '../core/constantsTask';

class HeartMonitor extends Component {
  state = {
    graph: true
  }

  static propTypes = {
    heartRate: PropTypes.number.isRequired,
    heartRateMeasure: PropTypes.func.isRequired,
    alertList: PropTypes.array.isRequired,
    startTaskBackground: PropTypes.func.isRequired,
    sendSms: PropTypes.func.isRequired,
    monitoring: PropTypes.func.isRequired,
    stopTaskBackground: PropTypes.func.isRequired,
    updateChart: PropTypes.func.isRequired,
    disconnectFromDevice: PropTypes.func.isRequired,
    dataChart: PropTypes.array.isRequired,
    telephone: PropTypes.string.isRequired
  }
 
  componentDidMount() {
    //this.props.stopTaskBackground(consts.heartRateTask);
    //this.props.startTaskBackground(consts.heartRateTask, ()=> this.props.heartRateMeasure(), consts.periodHeart);
    //if(this.intervalChart != undefined)
    TimerMixin.clearInterval(this.intervalChart);
    //if(this.intervalHeart)
    TimerMixin.clearInterval(this.intervalHeart);
    //if(this.intervalMonitoring)
    TimerMixin.clearInterval(this.intervalMonitoring);
    
    this.intervalHeart = TimerMixin.setInterval(
      () => this.props.heartRateMeasure(),
      consts.periodHeart
    );
    this.intervalMonitoring = TimerMixin.setInterval(
      () => this.props.monitoring(),
      consts.periodMonitoring
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
  

  }
  _renderAlerteCell(item){
    const date = new Date(item.date);
    //console.log(item);
    return (
      <ListItem iconLeft style={{display: 'flex', justifyContent: 'center', borderBottomColor: redTheme.primaryColor}}>
        <Icon1 size={30} color={redTheme.primaryColor} name='add-alert' style={{marginRight: 10}} />
        <Text note>Heart Rate: {item.heartRate}      Date: {date.getDate()}/{date.getMonth()}/{date.getYear()}</Text>
      </ListItem>)
  }
  render(){
    const { dataChart, alertList, sendSms, telephone, heartRate } = this.props;
    console.log(alertList);
    let graph = this.state.graph;
    return (
    <Container>
        <Content contentContainerStyle={{ flex: 1}}>
            <View style={styles.view}>
              {/*<TouchableHighlight onPress={()=> {
                sendSms(telephone, 'TEST - Alerta pulsul: '+heartRate+'- Sa depistat o contracții ventriculare premature')
              }}>*/}
                <Heart scale={8} value={heartRate.toString()}/>
              {/*</TouchableHighlight>*/}
              { dataChart && dataChart.length == 4 && graph && <BarChart data={dataChart} accessorKey='heartRate' /> }
              { !graph &&
               <List
                  style={{position:'absolute', bottom:0,width:'100%', height:270 }}
                  dataArray={alertList}
                  renderRow={this._renderAlerteCell.bind(this)} />}
            </View>
        </Content>
         <Footer>
            <FooterTab style={redTheme.footerTab}>
                <Button  
                style={graph? redTheme.footerTabButtonActive : redTheme.footerTabButton}
                active={graph}
                onPress={()=>{ 
                  this.setState({graph:true})
                }}>
                    <Icon2 size={30} color='white' name='bar-graph' />
                </Button>
                <Button 
                  style={!graph? redTheme.footerTabButtonActive : redTheme.footerTabButton}
                  onPress={()=>{
                    this.setState({graph:false});
                    sendSms(telephone, 'TEST - Alerta pulsul: ' + heartRate + ' - Sa depistat o contracții ventriculare');
                  }}
                  active={!graph}>
                    <Icon1 size={30} color='white' name='add-alert' />
                </Button>
            </FooterTab>
          </Footer>
    </Container>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    display: 'flex',
    width: '100%'
  }
});

const mapStateToProps = (state) => {
  return { 
    heartRate: state.heart.heartRateNow,
    dataChart: state.heart.dataChart,
    alertList: state.heart.alertList,
    telephone: state.heart.telephone
  }
}

export default connect(mapStateToProps, {
  heartRateMeasure,
  updateChart,
  disconnectFromDevice,
  startTaskBackground,
  stopTaskBackground,
  monitoring,
  sendSms
})(HeartMonitor);