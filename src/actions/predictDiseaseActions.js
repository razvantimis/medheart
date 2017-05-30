import * as types from './types';
import { action, getLogger } from '../core/utils'

import NeuronalNetwork from '../services/neuronalNetwork';

const log = getLogger('predictDisease/action');

export const onChangePropsPredict = (nameProps, value) => {
  log('Change props '+ nameProps + ' with value = '+ value)
  return action(types.ON_CHANGE_PROPS_PREDICT,{nameProps, value})
}

export function resetPredict() {
  return {
    type: types.RESET_PREDICT,
    payload: null
  }
}

export const onPredicting = () => (dispatch, getState) => {
  dispatch(action(types.START_PREDTINING));
  log('Start predicting');
  let predict = getState().predictDisease.predict;
  let predictArray = [];

  for (let key in predict) {
    let value = parseFloat(predict[key]);
    predictArray.push(value);
  }
  log(predictArray);
  let netw = new NeuronalNetwork();
  let predicted = netw.predict(predictArray).toString().substring(2,4);
  let date = new Date();
  log(predicted);
  dispatch(action(types.UPDATE_PREDICTED,{ predicted, date}))

}