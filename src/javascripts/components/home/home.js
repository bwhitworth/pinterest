import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';

// LOGS IN USER WITH GOOGLE, VIA FIREBASE AUTHENTICATION
const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

// LOGS USER OUT, VIA FIREBASE AUTHENTICATION
const logoutEvent = () => {
  $('#logout-btn').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

// PRINTS LOGIN BUTTON TO PAGE, ATTACHES CLICK EVENT LISTENER TO LOG USER IN
const loginButton = () => {
  const domString = '<button id="google-auth" class="btn btn-primary">Login with Google</button>';
  utils.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton, logoutEvent };
