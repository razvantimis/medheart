import { AppNavigator } from '../navigation'

export default (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};