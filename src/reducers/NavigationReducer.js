import { AppNavigator } from '../navigation'

const INITIAL_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('login'));

export default (state = INITIAL_STATE, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};