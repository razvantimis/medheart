import { action, getLogger } from '../core/utils';
import * as types from './types';
import DeviceInfo from 'react-native-device-info';
import firebase from '../MHFireBase';

const log = getLogger('user/action');

export const onLogin = () => (dispatch, getState) => {
  const { authorizing  } = getState().user;
  if(!authorizing){
    dispatch(action(types.USER_START_AUTHORIZING));
    log('onLogin: start');
    firebase.auth().signInAnonymously().then(() => {
      const { name } = getState().user;
      firebase.database().ref(`users/${DeviceInfo.getUniqueID()}`).set({
        name
      });
      log('onLogin: succes login ' + name);
      dispatch(action(types.USER_AUTHORIZED));
    });
  }
};

export const logout = () => (dispatch) => {
  firebase.auth().signOut().then(function() {
    log('logout: succes')
    dispatch(action(types.LOGOUT_SUCCES));
    dispatch(action(types.RESET_STATE));
  }, function(error) {
    log('logout: error = ' + error.message)
    dispatch(action(types.PUSH_ERROR, { errorMessage: error.message}))
  });
  
}

export const checkUserExists = () => (dispatch , getState) => {
  const { authorizing  } = getState().user;
  log('checkUserExists: start');
  if(!authorizing){
    dispatch(action(types.USER_START_AUTHORIZING));

    firebase
    .auth()
    .signInAnonymously()
    .then(() =>
      firebase
        .database()
        .ref(`users/${DeviceInfo.getUniqueID()}`)
        .once('value', snapshot => {
          const val = snapshot.val();

          if (val === null) {
            dispatch(action(types.USER_NO_EXIST));
          } else {
            log('checkUserExists: succes login name = '+val.name)
            dispatch(action(types.UPDATE_USER_NAME, { name: val.name}))
            dispatch(action(types.USER_AUTHORIZED));
          }
        })
    )
    .catch(err => {
      log(err);
      dispatch(action(types.USER_NO_EXIST));
    });
  }
  log('checkUserExists: end');
 
};
