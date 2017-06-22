import * as types from '../actions/types'
import moment from 'moment';

const INITIAL_STATE = {
  heartRateNow: 0,
  heartRates: {
    '21-06-2017':{
      '10': [ { heartRate: 50, hour:'10:05'} ],
    }
  },
  telephone: '',
  heartRateThree: [30, 10, 20],
  dataChart: [],
  taskBackground: {},
  alertList: [
    {
      date: new Date(),
      heartRate: 120,
      message: 'Test'
    }
  ]
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  case types.UPDATE_HEART_RATE: {
    let date = moment().local().format('DD-MM-YYYY');
    let hour = moment().local().format('HH');
    let minute = moment().local().format('mm');
    
    let heartRateNow = action.payload.heartRate;
    let heartRateThree = state.heartRateThree;
    let heartRates = state.heartRates ? {...state.heartRates}: {} ;
    
    heartRates[date] = heartRates[date] ? {...heartRates[date]}: {};
    heartRates[date][hour] = heartRates[date][hour]? [...heartRates[date][hour]]: [];
    if(heartRateNow !== 0){
      heartRates[date][hour].push({heartRate: heartRateNow, hour: hour + ':' + minute })
      // three hear rate
      heartRateThree.push(heartRateNow);
      if(heartRateThree.length > 3){
        heartRateThree.shift();
      }
    }

    return {...state, heartRateNow, heartRates, heartRateThree }
  }
  case types.UPDATE_DATA_CHART:{
    return {...state, dataChart: action.payload.dataChart }
  }
  case types.START_TASK_BACKGROUND: {
    let taskBackground = {...state.taskBackground};
    taskBackground[action.payload.name] = true;
    return {...state, taskBackground}
  }
  case types.STOP_TASK_BACKGROUND: {
    let taskBackground = {...taskBackground};
    taskBackground[action.payload.name] = false;
    return {...state, taskBackground}
  }
  case types.SEND_ALERT:{
    let alertList = [...state.alertList];
    alertList.push(action.payload);
    return {...state, alertList}
  }
  case types.ON_CHANGE_TELEPHONE:{
    return {...state, telephone: action.payload.telephone}
  }
  case types.RESET_STATE: {
    return INITIAL_STATE;
  }
  default:
    return state;
  }
}