import * as types from '../actions/types';


const INITIAL_STATE = {
  predict: {
    gender: '1', // (M=1)(F=0)
    age: '23', // 3 - 120 int number
    chestPainType: '1', // --Value 1:typical angina 
    //--Value 2: atypical anginal
    //--Value 3: non-anginal pain
    //--Value 4: asymptotic
    restingBloodPressure: '70',
    cholesterol: '46',
    fastingBloodSugar: '0', //  (fasting blood sugar > 120 mg/dl) (1 = true; 0 = false) 
    restingECG: '0', // --Value 0: normal
    //--Value 1:having ST-T wave abnormality (T wave inversions and/or ST)
    //--Value 2:showing probable or definite left ventricular Hypertrophy by Estes’ criteria
    maximumHeartRate: '80', // 40 - 200 bpm
    exerciseInducedAngina: '0', // (1=yes;0=no)
    oldPeak: '34',
    slop: '1', // --Value 1: up sloping
    //--Value 2: flat
    //--Value 3:down sloping
    numberOfVesselsColored: '0', // --(0-3)
    thal: '3' // Normal, fixed defect, reversible defect --3,6,7
  },
  predictedProgress: true,
  predicted: {
    date: null,
    value: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
  case types.ON_CHANGE_PROPS_PREDICT:{
    let nameProps = action.payload.nameProps;
    let value = action.payload.value;
    let predict = {...state.predict};
    predict[nameProps] = value;
    return {...state, predict}
  }
  case types.START_PREDTINING: {
    return {...state, predictedProgress: true}
  }
  case types.UPDATE_PREDICTED: {
    let predicted = {
      date: action.payload.date,
      value: action.payload.predicted
    };

    return { ...state,
      predictedProgress: false,
      predicted
    };

  }
  case types.RESET_PREDICT:
    {
      let predicted = {
        date: null,
        value: null
      }

      return { ...state,
        predictedProgress: false,
        predicted
      };
    }
  default:
    return state;
  }


}