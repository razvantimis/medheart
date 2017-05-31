import * as types from './types';

export function updateHeartRate(heartRate){
  return {
    type: types.UPDATE_HEART_RATE,
    payload: { heartRate }
  }
}

