import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import pinsComp from '../pins/pins';
import newBoardForm from './newBoardForm';
import newPinForm from '../pins/newPinForm';
import pinEditor from '../pins/pinEditor';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// DELETES SINGLE BOARD WHEN TRASH BUTTON IS CLICKED
// THEN RE-PRINTS REMAINING BOARDS (REFRESHED VERSION)
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
      resolve(response);
    })
    .catch((err) => reject(err));
});

// CAPTURES INPUT FORM VALUES AND PUSHES TO FIREBASE (ADDBOARD)
const submitNewBoard = (e) => {
  e.preventDefault();
  const newBoard = {
    name: $('#input-board-name').val(),
    description: $('#input-board-desc').val(),
    uid: firebase.auth().currentUser.uid,
  };
  boardData.addBoard(newBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      boardBuilder();
    })
    .catch((err) => console.error('could not add board', err));
};

// CONSOLIDATE CLICK EVENTS TO SINGLE FUNCTION
const clickEvents = () => {
  $('body').on('click', '.delete-board', deleteBoard);
  $('body').on('click', '.board-card', pinsComp.pinBuilderEvent);
  $('body').on('click', '#add-board', newBoardForm.boardFormBuilder);
  $('body').on('click', '#submit-new-board', submitNewBoard);
  $('body').on('click', '#submit-new-pin', pinsComp.submitNewPin);
  $('body').on('click', '.add-pin', newPinForm.pinFormBuilder);
  $('body').on('click', '.edit-btn', pinEditor.showPinEditor);
  $('body').on('click', '.save-btn', pinData.submitPinChange);
};

// CALLS getUserBoards TO GET ONLY BOARDS BELONGING TO LOGGED-IN USER
// BUILDS CARD FOR EACH BOARD AND PRINTS INTO boards DIV
// ASSIGNS CLICK EVENTS TO BUTTONS
const boardBuilder = () => {
  let domString = '';
  domString += '<div class="row wrap col-12 boards-header"><h1>Boards:</h1>';
  domString += '<button class="btn btn-danger red-btn offset-1 align-self-center" id="add-board"><i class="fas fa-plus"></i></button></div>';
  const currentUserUid = firebase.auth().currentUser.uid;
  boardData.getUserBoards(currentUserUid)
    .then((boards) => {
      domString += '<div class="row wrap">';
      boards.forEach((b) => {
        domString += '<div class="col-4">';
        domString += `  <div class="card board-card" id="${b.id}" label="${b.name}">`;
        domString += `    <h5 class="card-header">${b.name}</h5>`;
        domString += '    <div class="card-body">';
        domString += `      <p class="card-text">${b.description}</>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += `    <button class="col-12 btn btn-secondary delete delete-board" id="${b.id}"><i class="far fa-trash-alt"></i> Delete Board</button>`;
        domString += '</div>';
      });
      domString += '</div>';
      domString += '<br>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('problem with boardBuilder', err));
  clickEvents();
};

export default { boardBuilder };
