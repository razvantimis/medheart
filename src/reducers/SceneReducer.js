import { ActionConst } from 'react-native-router-flux'
import * as SceneConst from '../constants/SceneConst.js' 

const defaultState = {
    state : 'root'
}

export default function (state = defaultState, action) {
    switch(action.type) {
        case ActionConst.FOCUS:
            return {...state, state:action.scene.sceneKey};
    }
    return state;
} 