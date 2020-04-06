import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import pinsComp from '../pins/pins';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// DELETES SINGLE PIN WHEN TRASH BUTTON IS CLICKED
const deleteBoard = (e) => new Promise((resolve, reject) => {
  const boardToDelete = e.target.closest('.delete-board').id;
  axios.delete(`${baseUrl}/boards/${boardToDelete}.json`)
    .then((response) => {
      pinData.getPins(boardToDelete)
        .then((board) => {
          board.forEach((p) => {
            axios.delete(`${baseUrl}/pins/${p.id}.json`);
          });
        });
      // eslint-disable-next-line no-use-before-define
      boardBuilder();
      utils.printToDom('single-board', '');
      resolve(response);
    })
    .catch((err) => reject(err));
});

// CALLS getUserBoards TO GET ONLY BOARDS BELONGING TO LOGGED-IN USER
// BUILDS CARD FOR EACH BOARD AND PRINTS INTO boards DIV
// ASSIGNS CLICK EVENT TO EACH CARD, WHICH WILL OPEN SINGLE VIEW AND BUILD PINS
const boardBuilder = () => {
  let domString = '';
  domString += '<h1>BOARDS:</h1>';
  const currentUserUid = firebase.auth().currentUser.uid;
  boardData.getUserBoards(currentUserUid)
    .then((board) => {
      domString += '<div class="row wrap">';
      board.forEach((b) => {
        domString += '<div class="col-4">';
        domString += `  <div class="card board-card" id="${b.id}" label="${b.name}">`;
        domString += `    <h5 class="card-header">${b.name}</h5>`;
        domString += '    <div class="card-body">';
        domString += `      <p class="card-text">${b.description}</>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += `    <button class="col-12 btn btn-secondary delete-board" id="${b.id}"><i class="far fa-trash-alt text-white"></i></button>`;
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('problem with boardBuilder', err));
  $('body').on('click', '.delete-board', deleteBoard);
  $('body').on('click', '.board-card', pinsComp.pinModalBuilder);
};

export default { boardBuilder };
