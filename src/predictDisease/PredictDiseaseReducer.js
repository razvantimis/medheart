import * as types from './actions/types';
import * as consts from './constants';

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
        slop: '1',// --Value 1: up sloping
        //--Value 2: flat
        //--Value 3:down sloping
        numberOfVesselsColored: '0', // --(0-3)
        thal: '3' // Normal, fixed defect, reversible defect --3,6,7
    },
    step: consts.STEP_START,
    predictedProgress: true
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case types.ON_CHANGE_CHEST_PAIN_TYPE:
        {
            let chestPainType = action.payload.chestPainType;
            let predict = {...state.predict, chestPainType};
            return {...state, predict};
        }
        case types.ON_CHANGE_GENDER:
        {
            let gender = action.payload.gender;
            let predict = {...state.predict, gender};
            return {...state, predict};
        }
        case types.ON_CHANGE_AGE:
        {
            let age = action.payload.age;
            let predict = {...state.predict, age};
            return {...state, predict};
        }
        case types.ON_CHANGE_CHOLESTEROLE:
        {
            let cholesterol = action.payload.cholesterol;
            let predict = {...state.predict, cholesterol};
            return {...state, predict};
        }
         case types.ON_CHANGE_RESTING_BLOOD_PRESSURE:
        {
            let restingBloodPressure = action.payload.restingBloodPressure;
            let predict = {...state.predict, restingBloodPressure};
            return {...state, predict};
        }
         case types.ON_CHANGE_FASTING_BLOOD_SUGAR:
        {
            let fastingBloodSugar = action.payload.fastingBloodSugar;
            let predict = {...state.predict, fastingBloodSugar};
            return {...state, predict};
        }
         case types.ON_CHANGE_RESTING_ECG:
        {
            let restingECG = action.payload.restingECG;
            let predict = {...state.predict, restingECG};
            return {...state, predict};
        }
         case types.ON_CHANGE_MAXIMUM_HEARTRATE:
        {
            let maximumHeartRate = action.payload.maximumHeartRate;
            let predict = {...state.predict, maximumHeartRate};
            return {...state, predict};
        }
          case types.ON_CHANGE_EXERCISE_INDUCED_ANGINA:
        {
            let exerciseInducedAngina = action.payload.exerciseInducedAngina;
            let predict = {...state.predict, exerciseInducedAngina};
            return {...state, predict};
        }
        case types.ON_CHANGE_OLD_PEAK:
        {
            let oldPeak = action.payload.oldPeak;
            let predict = {...state.predict, oldPeak};
            return {...state, predict};
        }
        case types.ON_CHANGE_SLOP:
        {
            let slop = action.payload.slop;
            let predict = {...state.predict, slop};
            return {...state, predict};
        }
        case types.ON_CHANGE_NUMBER_OF_VESSELS_COLORED:
        {
            let numberOfVesselsColored = action.payload.numberOfVesselsColored;
            let predict = {...state.predict, numberOfVesselsColored};
            return {...state, predict};
        }
         case types.ON_CHANGE_THAL:
        {
            let thal = action.payload.thal;
            let predict = {...state.predict, thal};
            return {...state, predict};
        }
        case types.NEXT_STEP:
        {   
             let step;
            switch(state.step){
                case consts.STEP_START:
                   step = consts.STEP_2;
                   break;
                case consts.STEP_2:
                    step = consts.STEP_END
                    break;
                default:
                    step = consts.STEP_START
            }
            return {...state, step };
        }
         case types.PREV_STEP:
        {   
            let step;
            switch(state.step){
                case consts.STEP_2:
                    step = consts.STEP_START;
                    break;
                default:
                    step = consts.STEP_START
            }
            return {...state, step };
        }
        default:
             return state;
    }
   

}