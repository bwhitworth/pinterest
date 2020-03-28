import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

const boardBuilder = () => {
  if (firebase.auth().currentUser) {
    const currentUserUid = firebase.auth().currentUser.uid;
    boardData.getUserBoards(currentUserUid)
      .then((board) => {
        let domString = '';
        domString += '<div class="row wrap">';
        board.forEach((b) => {
          domString += '<div class="card col-3">';
          domString += `  <h5 class="card-header">${b.name}</h5>`;
          domString += '  <div class="card-body">';
          domString += `    <p class="card-text">${b.description}</>`;
          domString += '  </div>';
          domString += '</div>';
        });
        domString += '</div>';
        utils.printToDom('boards', domString);
      })
      .catch((err) => console.error('problem with boardBuilder', err));
  }
};

export default { boardBuilder };
