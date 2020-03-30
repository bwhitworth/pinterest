import firebase from 'firebase/app';
import 'firebase/auth';
import boardsComp from '../../components/boards/boards';

// ASSIGN DIV ID'S TO VARIABLES FOR ADDING AND REMOVING CLASSES
const authDiv = $('#auth');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#logout-btn');

// ADD OR REMOVE THE 'HIDE' CLASS OF DIVS, BASED ON USER LOGGED IN OR OUT
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boardsComp.boardBuilder();
    } else {
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
