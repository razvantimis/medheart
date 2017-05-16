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