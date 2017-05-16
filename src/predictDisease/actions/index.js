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