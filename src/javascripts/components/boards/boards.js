import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import pinsComp from '../pins/pins';

const boardBuilder = () => {
  if (firebase.auth().currentUser) {
    const currentUserUid = firebase.auth().currentUser.uid;
    boardData.getUserBoards(currentUserUid)
      .then((board) => {
        let domString = '';
        domString += '<div class="row wrap">';
        board.forEach((b) => {
          domString += '  <div class="col-4">';
          domString += `<div class="card board-card" id="${b.id}" label="${b.name}">`;
          domString += `  <h5 class="card-header">${b.name}</h5>`;
          domString += '  <div class="card-body">';
          domString += `    <p class="card-text">${b.description}</>`;
          domString += '  </div>';
          domString += '</div>';
          domString += '  </div>';
        });
        domString += '</div>';
        utils.printToDom('boards', domString);
      })
      .catch((err) => console.error('problem with boardBuilder', err));
  }
  $('body').on('click', '.board-card', pinsComp.pinBuilder);
};

export default { boardBuilder };
