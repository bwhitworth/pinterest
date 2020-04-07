import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import pinsComp from '../pins/pins';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// HIDES THE SINGLE BOARD MODAL
const closeNewBoardForm = () => {
  $('#newBoardModal').modal('hide');
};

// BUILDS INPUT FORM INTO MODAL CONTAINER
const boardInputForm = () => {
  let domString = '';
  domString += '<div>';
  domString += '<label for="boardNameInput">Board Name:</label>';
  domString += '<input class="form-control" id="input-board-name" type="text" placeholder="Inspiration">';
  domString += '<br><label for="boardDescInput">Description:</label>';
  domString += '<input class="form-control" id="input-board-desc" type="text" placeholder="New ideas that motivate me">';
  domString += '<br><button class="col-12 btn btn-danger red-btn" id="submit-new-board">Submit</button>';
  domString += '</div>';
  utils.printToDom('new-board-modal-container', domString);
};


// OPENS NEW BOARD INPUT FORM MODAL
// ASSIGNS CLICK EVENTS FOR CLOSE AND SUBMIT BUTTONS
const newBoardModal = () => {
  boardInputForm();
  $('#newBoardModal').modal('show');
  $('#close-board-form').on('click', closeNewBoardForm);
  $('#submit-new-board').on('click', boardData.addNewBoard);
  // $('body').on('click', '#submit-new-board', console.error('submitted!'));
};

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

// CALLS getUserBoards TO GET ONLY BOARDS BELONGING TO LOGGED-IN USER
// BUILDS CARD FOR EACH BOARD AND PRINTS INTO boards DIV
// ASSIGNS CLICK EVENT TO EACH DELETE BUTTON, WHICH WILL DELETE BOARD
// ASSIGNS CLICK EVENT TO EACH CARD, WHICH WILL OPEN SINGLE VIEW AND BUILD PINS
// ASSIGNS CLICK EVENT TO NEW BOARD BUTTON, WHICH WILL OPEN INPUT FORM MODAL
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
        domString += `    <button class="col-12 btn btn-secondary delete delete-board" id="${b.id}"><i class="far fa-trash-alt"></i> Delete Board</button>`;
        domString += '</div>';
      });
      domString += '</div>';
      domString += '<button class="btn btn-danger red-btn col-2" id="add-board"><i class="fas fa-plus"></i> New Board</button><br>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('problem with boardBuilder', err));
  $('body').on('click', '.delete-board', deleteBoard);
  $('body').on('click', '.board-card', pinsComp.pinModalBuilder);
  $('body').on('click', '#add-board', newBoardModal);
};

export default { boardBuilder };
