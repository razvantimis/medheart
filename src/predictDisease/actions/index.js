import * as types from './types';

export function onChangeChestPainType(chestPainType) {
    return {
        type: types.ON_CHANGE_CHEST_PAIN_TYPE,
        payload: { chestPainType }
    }
}

export function onChangeGender(gender) {
    return {
        type: types.ON_CHANGE_GENDER,
        payload: { gender }
    }
}

export function onChangeAge(age) {
    return {
        type: types.ON_CHANGE_AGE,
        payload: { age }
    }
}


export function onChangeRestingBloodPressure(restingBloodPressure) {
    return {
        type: types.ON_CHANGE_RESTING_BLOOD_PRESSURE,
        payload: { restingBloodPressure }
    }
}


export function onChangeCholesterol(cholesterol) {
    return {
        type: types.ON_CHANGE_CHOLESTEROLE,
        payload: { cholesterol }
    }
}

export function onChangeFastingBloodSugar(fastingBloodSugar) {
    return {
        type: types.ON_CHANGE_FASTING_BLOOD_SUGAR,
        payload: { fastingBloodSugar }
    }
}

export function onChangeRestingECG(restingECG) {
    return {
        type: types.ON_CHANGE_RESTING_ECG,
        payload: { restingECG }
    }
}

export function onChangeMaximumHeartRate(maximumHeartRate) {
    return {
        type: types.ON_CHANGE_MAXIMUM_HEARTRATE,
        payload: { maximumHeartRate }
    }
}
export function onChangeExerciseInducedAngina(exerciseInducedAngina) {
    return {
        type: types.ON_CHANGE_EXERCISE_INDUCED_ANGINA,
        payload: { exerciseInducedAngina }
    }
}
export function onChangeOldPeak(oldPeak) {
    return {
        type: types.ON_CHANGE_OLD_PEAK,
        payload: { oldPeak }
    }
}
export function onChangeSlop(slop) {
    return {
        type: types.ON_CHANGE_SLOP,
        payload: { slop }
    }
}

export function onChangeNumberOfVesselsColored(numberOfVesselsColored) {
    return {
        type: types.ON_CHANGE_NUMBER_OF_VESSELS_COLORED,
        payload: { numberOfVesselsColored }
    }
}

export function onChangeThal(thal) {
    return {
        type: types.ON_CHANGE_THAL,
        payload: { thal }
    }
}

export function nextStep() {
    return {
        type: types.NEXT_STEP,
        payload: null
    }
}

export function prevStep() {
    return {
        type: types.PREV_STEP,
        payload: null
    }
}
export function resetPredict() {
    return {
        type: types.RESET_PREDICT,
        payload: null
    }
}

export function onPredicting(predict) {
    let predictArray = [];
    
    for(let key in predict) {
        let value = parseFloat(predict[key]);
        predictArray.push(value);
    }
    return {
        type: types.ON_PREDICTING,
        payload: { predictArray }
    }
}