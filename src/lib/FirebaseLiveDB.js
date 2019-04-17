import firebase from 'firebase';
import credentials from '../../credentials';
const config = {
  apiKey: credentials.apiKey,
  authDomain: credentials.authDomain,
  databaseURL: credentials.databaseURL,
  projectId: credentials.projectId,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId
};

firebase.initializeApp(config);

let firebaseDb = firebase.database();

module.exports = firebaseDb;