import * as types from '../actions/types'
const INITIAL_STATE = {
  name: 'Pacient',
  authorizing: false,
  authorized: false
}
export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  case types.USER_START_AUTHORIZING:
    return {...state, authorizing: true, authorized: false}
  case types.USER_AUTHORIZED:
    return {...state, authorizing: false, authorized: true }
  case types.USER_NO_EXIST:
    return {...state, authorized: false, authorizing: false}
  case types.UPDATE_USER_NAME: {
    return {...state, name: action.payload.name}
  }
  default:
    return state;
  }

}