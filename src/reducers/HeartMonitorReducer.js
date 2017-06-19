import * as types from '../actions/types'
import moment from 'moment';


const INITIAL_STATE = {
  heartRateNow: 0,
  heartRates: {
    '04-06-2017':{
      '12': [ { heartRate: 50, hour:'12:05'} ],
    }
  },
  
  dataChart: [],
  taskBackground: {}
}


export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  case types.UPDATE_HEART_RATE: {
    let date = moment().local().format('DD-MM-YYYY');
    let hour = moment().local().format('HH');
    let minute = moment().local().format('mm');
    
    let heartRateNow = action.payload.heartRate;
    let heartRates = state.heartRates ? {...state.heartRates}: {} ;
    
    heartRates[date] = heartRates[date] ? {...heartRates[date]}: {};
    heartRates[date][hour] = heartRates[date][hour]? [...heartRates[date][hour]]: [];
    if(heartRateNow !== 0){
      heartRates[date][hour].push({heartRate: heartRateNow, hour: hour + ':' + minute })
    }

    return {...state, heartRateNow, heartRates }
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
  case types.RESET_STATE: {
    return INITIAL_STATE;
  }
  default:
    return state;
  }
}