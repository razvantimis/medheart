import * as types from '../actions/types'

const INITIAL_STATE = {
  heartRate: 0
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  case types.UPDATE_HEART_RATE: {
    return {...state, heartRate: action.payload.heartRate}
  }
  default:
    return state;
  }
}