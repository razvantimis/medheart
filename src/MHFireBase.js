import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDTq8L1cQMWgjnIZQYBwOO4zM42ocAuO1s',
  authDomain: 'medheart-97d12.firebaseapp.com',
  databaseURL: 'https://medheart-97d12.firebaseio.com',
  projectId: 'medheart-97d12',
  storageBucket: 'medheart-97d12.appspot.com',
  messagingSenderId: '215958109507'
};
firebase.initializeApp(config);

export default firebase;