import { action } from '../core/utils';
import * as types from './types';
import { getLogger } from '../core/utils';
import { optionsTask } from '../core/constantsTask';
import SendSMS from 'react-native-sms'
import BackgroundJob from 'react-native-background-job';
import * as _ from 'lodash';
import moment from 'moment';
const log = getLogger('heartActions');

export const monitoring = () => (dispatch, getState) => {
  log('start monitoring')
  try{
    let heartRateThree = getState().heart.heartRateThree;
    let telephone = getState().heart.telephone;
    if(heartRateThree.length == 3 && heartRateThree[0] != 0 && heartRateThree[1] != 0 && heartRateThree[2] != 0  ){
      let heartRate = heartRateThree[2];
      let RR1 = heartRateThree[0]/60;
      let RR2 = heartRateThree[1]/60;
      let RR3 = heartRateThree[2]/60;
      log(RR1 + '  ' + RR2 + '  ' + RR3);

      if( (RR1 > 1.15*RR2 && RR3 < 1.15*RR2) || (Math.abs(RR1 - RR2) < 0.3 && RR1 < 0.8 && RR2 < 0.8 && 0.6 *(RR1+RR2)< RR3) || (Math.abs(RR2 - RR2) < 0.3 && RR3 < 0.8 && RR2 < 0.8 && 0.6 *(RR3+RR2)< RR1) ){
        // depistarea contracții ventriculare premature
        sendSms(telephone, 'Alerta pulsul: '+heartRate+'- Sa depistat o contracții ventriculare premature')
        dispatch(action(types.SEND_ALERT,{date: new Date(), heartRate, message:'Sa depistat o contracții ventriculare premature'}));
      } else if( RR2 > 2.2 && RR3 < 3 && (Math.abs(RR1-RR2) < 0.2 || Math.abs(RR2- RR3) < 0.2)){
        // blocărilor la nivelul inimii
        sendSms(telephone, 'Alerta pulsul: '+heartRate+'- Sa depistat o blocăre la nivelul inimii')
        dispatch(action(types.SEND_ALERT,{date: new Date(), heartRate, message:'Sa depistat o blocăre la nivelul inimii'}));
      } else if ( heartRate < 60 || heartRate > 100){
        sendSms(telephone, 'Alerta pulsul: '+heartRate+'- Sa depistat o anomalie a ritmului cardiac')
        dispatch(action(types.SEND_ALERT,{date: new Date(), heartRate, message:'Sa depistat o anomalie a ritmului cardiac'}));
      }
    }
    
  }catch(exception){
        //
  }
  
}


export const sendSms = (telephone, message)=> async () => {
  await SendSMS.send({
    body: message.toString(),
    recipients: [telephone.toString()],
    successTypes: ['sent']
  }, (completed, cancelled, error) => {
    log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
  });
}

export const startTaskBackground = (name, func, time) => (dispatch, getState) => {
  
  const taskBackground = getState().heart.taskBackground;
  
  if(!taskBackground[name]){
    log('create task background ' + name);
    dispatch(action(types.START_TASK_BACKGROUND, { name }));

    const backgroundJobHeartRate = {
      jobKey: name,
      job: () => {
        func();
        log('Running in background ' + name);
      }
    };

    BackgroundJob.register(backgroundJobHeartRate);
    var backgroundScheduleHeartRate = {
      jobKey: name,
      timeout: 60000,
      period: time,
      alwaysRunning: true,
      ...optionsTask
    };

    BackgroundJob.schedule(backgroundScheduleHeartRate);
  }

};
export const stopTaskBackground = (name) => (dispatch, getState) => {
  const taskBackground = getState().heart.taskBackground;
  
  if(taskBackground[name]){
    log('Stop Task Background '+name);
    BackgroundJob.cancel({jobKey: name});
    dispatch(action(types.STOP_TASK_BACKGROUND, { name }));
  } else {
    log('Dont exit Task Background '+name);
  }
}

export const updateChart = () => (dispatch, getState) => {
  log('updateChart: Start update chart');
  const state = getState().heart;

  let dateNow = moment().local().format('DD-MM-YYYY');
  let dateYesterday = moment().local().subtract(1, 'days').format('DD-MM-YYYY');

  let hour = parseInt(moment().local().format('HH'));
  if (hour % 2 != 0) hour -= 1;
  const hours = [
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    0,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    0
  ];

  const displayHours = hours.slice(
    hours.lastIndexOf(hour) - 7,
    hours.lastIndexOf(hour) + 1
  );


  let heartRates = state.heartRates;
  let heartRatesToDay = heartRates[dateNow];
  let heartRatesToYesterday = heartRates[dateYesterday];

 
  if (heartRatesToDay) {
    log('updateChart: procesing data');
    
    let dataChart = [];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      let hour1 = displayHours[i];
      let hour2 = displayHours[i + 4];

      let isYesterday = hour - 8 < 0;
      let heartRate1;
      if (isYesterday && hour1 - 8 > 0) {
        heartRate1 = heartRatesToYesterday[hour1]
          ? _.max(heartRatesToYesterday[hour1].map(item => item.heartRate))
          : 0;
      } else {
        heartRate1 = heartRatesToDay[hour1]
          ? _.max(heartRatesToDay[hour1].map(item => item.heartRate))
          : 0;
      }
      let heartRate2;
      if (isYesterday && hour2 - 8 > 9) {
        heartRate2 = heartRatesToYesterday[hour2]
          ? _.max(heartRatesToYesterday[hour2].map(item => item.heartRate))
          : 0;
      } else {
        heartRate2 = heartRatesToDay[hour2]
          ? _.max(heartRatesToDay[hour2].map(item => item.heartRate))
          : 0;
      }

      sum = sum + heartRate1 + heartRate2;
      dataChart.push([
        {
          heartRate: heartRate1,
          name: hour1 + ':00'
        },
        {
          heartRate: heartRate2,
          name: hour2 + ':00'
        }
      ]);
    }
    log('updateChart: finish procesing data');
    if (sum > 0) {
      log('updateChart: update ui');
      dispatch(action(types.UPDATE_DATA_CHART, { dataChart }));
    }
  }
};


export const onChangeTelephone = (telephone) => (dispatch) => {
  dispatch(action(types.ON_CHANGE_TELEPHONE,{telephone}));
}