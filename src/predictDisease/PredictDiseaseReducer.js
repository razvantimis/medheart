import * as types from './actions/types';

const INITIAL_STATE = {
    predict: {
        gender: '1', // (M=1)(F=0)
        age: undefined, // 3 - 120 int number
        chestPainType: '1', // --Value 1:typical angina 
        //--Value 2: atypical anginal
        //--Value 3: non-anginal pain
        //--Value 4: asymptotic
        restingBloodPressure: null,
        cholesterol: null,
        fasting_blood_sugar: null, // true or false value
        resting_ECG: null, // --Value 0: normal
        //--Value 1:having ST-T wave abnormality (T wave inversions and/or ST)
        //--Value 2:showing probable or definite left ventricular Hypertrophy by Estes’ criteria
        maximum_heart_rate: null, // 40 - 200 bpm
        exercise_induced_angina: null, // (1=yes;0=no)
        old_peak: null,
        slop: null,// --Value 1: up sloping
        //--Value 2: flat
        //--Value 3:down sloping
        number_of_vessels_colored: null, // --(0-3)
        thal: null // Normal, fixed defect, reversible defect --3,6,7
    },
    step: types.STEP_START
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
         case types.ON_CHANGE_RESTING_BLOOD_PRESSURE:
        {
            let restingBloodPressure = action.payload.restingBloodPressure;
            let predict = {...state.predict, restingBloodPressure};
            return {...state, predict};
        }
        default:
             return state;
    }
   

}