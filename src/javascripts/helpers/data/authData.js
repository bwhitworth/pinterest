import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-btn');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
    } else {
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
