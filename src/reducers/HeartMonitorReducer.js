import * as types from '../actions/types'
import * as _ from 'lodash';
import moment from 'moment';
import {
  getLogger
} from '../core/utils'

const log = getLogger('heartReducer');

const INITIAL_STATE = {
  heartRateNow: 0,
  heartRates: {
    '31/05/2017':{
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
    '30/05/2017':{
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
  
  dataChart: []
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
    let dateNow = moment().local().format('DD/MM/YYYY');
    let dateYesterday =  moment().local().subtract(1, 'days').format('DD/MM/YYYY');

    let hour = parseInt(moment().local().format('HH'));
    if(hour%2 !=0) hour-=1;
    const hours = [8,10,12,14,16,18,20,22,0,2,4,6,8,10,12,14,16,18,20,22,0];
    
    
 
    const displayHours = hours.slice(hours.lastIndexOf(hour)-7,hours.lastIndexOf(hour)+1)
    log(JSON.stringify(displayHours));

    let heartRates = state.heartRates;
    let heartRatesToDay = heartRates[dateNow];
    let heartRatesToYesterday = heartRates[dateYesterday];
    
    log(JSON.stringify(heartRatesToDay))
    if(heartRatesToDay && heartRatesToYesterday){
      let dataChart = [];
      let sum = 0;
      for(let i=0;i<4;i++){
        let hour1 = displayHours[i];
        let hour2 = displayHours[i+4];

        let isYesterday = hour-8<0;
        let heartRate1;
        if(isYesterday && hour1-8>0){
          heartRate1 = heartRatesToYesterday[hour1] ? _.max(heartRatesToYesterday[hour1].map((item)=> item.heartRate)): 0;
        } else {
          heartRate1 = heartRatesToDay[hour1] ? _.max(heartRatesToDay[hour1].map((item)=> item.heartRate)): 0;
        }
        let heartRate2;
        if(isYesterday && hour2-8>9){
          heartRate2 = heartRatesToYesterday[hour2] ? _.max(heartRatesToYesterday[hour2].map((item)=> item.heartRate)): 0;
        }else {
          heartRate2 = heartRatesToDay[hour2] ? _.max(heartRatesToDay[hour2].map((item)=> item.heartRate)): 0;
        }
      
        log(heartRate1)
        log(heartRate2)
        sum = sum + heartRate1 + heartRate2;
        dataChart.push([{
          'heartRate':heartRate1 ,
          'name': hour1+':00'
        }, {
          'heartRate': heartRate2,
          'name': hour2+':00'
        }])
      } 
      if(sum > 0){
        return {...state, dataChart }
      } 
    }
    return {...state, dataChart: state.dataChart }

  }
  default:
    return state;
  }
}