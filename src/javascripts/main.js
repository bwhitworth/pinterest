import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import boardsComp from './components/boards/boards';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  authData.checkLoginStatus();
  auth.logoutEvent();
  firebase.auth().onAuthStateChanged(() => {
    boardsComp.boardBuilder();
  });
};

init();
