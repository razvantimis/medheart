import * as types from '../actions/types'

const INITIAL_STATE = {
  scene: types.SCANNER_DECIVES,
  heartRate: 0
}

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch(action.type){
  case types.CHANGE_SCENE:{
    return {...state, scene: action.payload.scene}
  }
  case types.UPDATE_HEART_RATE: {
    return {...state, heartRate: action.payload.heartRate}

  }
  default:
    return state;
  }
}