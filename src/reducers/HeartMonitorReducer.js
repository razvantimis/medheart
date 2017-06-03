import * as types from '../actions/types'
import moment from 'moment';


const INITIAL_STATE = {
  heartRateNow: 0,
  heartRates: {
    '02/06/2017':{
      '23': [ { heartRate: 40, hour:'23:05'}, { heartRate: 65, hour:'23:10'} ],
      '21': [ { heartRate: 67, hour:'12:05'}, { heartRate: 40, hour:'12:10'} ],
      '20': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '19': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '18': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '17': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '16': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '15': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '14': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '13': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '12': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '11': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '10': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '9': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '8': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '7': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '6': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '5': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '4': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '3': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '2': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '1': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '0': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
    },
    '03/06/2017':{
      '23': [ { heartRate: 40, hour:'23:05'}, { heartRate: 65, hour:'23:10'} ],
      '21': [ { heartRate: 67, hour:'12:05'}, { heartRate: 40, hour:'12:10'} ],
      '20': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '19': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '18': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '17': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '16': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '15': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '14': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '13': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '12': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '11': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '10': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '9': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '8': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '7': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '6': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '5': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '4': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '3': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '2': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '1': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
      '0': [ { heartRate: 67, hour:'12:05'}, { heartRate: 80, hour:'12:10'} ],
    }
  },
  
  dataChart: [],
  taskBackground: {}
}


export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  case types.UPDATE_HEART_RATE: {
    let date = moment().local().format('DD/MM/YYYY');
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

  default:
    return state;
  }
}