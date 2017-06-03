import { action } from '../core/utils';
import * as types from './types';
import { getLogger } from '../core/utils';
import { optionsTask } from '../core/constantsTask';
import BackgroundJob from 'react-native-background-job';
import * as _ from 'lodash';
import moment from 'moment';
const log = getLogger('heartActions');

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
      timeout: 15000,
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
  }
}

export const updateChart = () => (dispatch, getState) => {
  const state = getState().heart;

  let dateNow = moment().local().format('DD/MM/YYYY');
  let dateYesterday = moment().local().subtract(1, 'days').format('DD/MM/YYYY');

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
  log(JSON.stringify(displayHours));

  let heartRates = state.heartRates;
  let heartRatesToDay = heartRates[dateNow];
  let heartRatesToYesterday = heartRates[dateYesterday];

  log(JSON.stringify(heartRatesToDay));
  if (heartRatesToDay && heartRatesToYesterday) {
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

      log(heartRate1);
      log(heartRate2);
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
    if (sum > 0) {
      dispatch(action(types.UPDATE_DATA_CHART, { dataChart }));
    }
  }
};
