import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import newPinForm from './newPinForm';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// DELETES SINGLE PIN WHEN TRASH BUTTON IS CLICKED
// THEN RE-PRINTS REMAINING PINS (REFRESHED VERSION)
const deletePin = (e) => new Promise((resolve, reject) => {
  const pinToDelete = e.target.closest('.pin-card').id;
  const parentBoard = e.target.closest('.card-body').id;
  axios.delete(`${baseUrl}/pins/${pinToDelete}.json`)
    .then((response) => {
      // eslint-disable-next-line no-use-before-define
      pinCardBuilder(parentBoard);
      resolve(response);
    })
    .catch((err) => reject(err));
});


const submitNewPin = (e) => {
  e.preventDefault();
  const boardTarget = e.target.closest('.pin-form');
  const newPin = {
    boardId: boardTarget.id,
    name: $('#input-pin-name').val(),
    imageUrl: $('#input-pin-img').val(),
  };
  console.error(newPin);

  pinData.addNewPin(newPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      pinCardBuilder(boardTarget.id);
    })
    .catch((err) => console.error('could not add pin', err));
};

// GETS PINS FOR THE BOARD THAT WAS PASSED IN
// BUILDS (MINI) CARD FOR EACH PIN AND PRINTS INTO BOARD CONTAINER
const pinCardBuilder = (boardId) => {
  const idThatBoard = boardId;
  pinData.getPins(boardId)
    .then((board) => {
      let domString = '';
      domString += '<h1>Pins:</h1>';
      domString += '<div class="row">';
      board.forEach((p) => {
        domString += `<div class="card pin-card" id="${p.id}">`;
        domString += '  <div class="img-container">';
        domString += `    <img src="${p.imageUrl}" class="card-img-top">`;
        domString += '  </div>';
        domString += `  <div class="card-body" id="${boardId}">`;
        domString += `    <p class="card-text">${p.name}</p>`;
        domString += `    <button class="btn btn-secondary delete delete-btn" id="delete-${p.id}"><i class="far fa-trash-alt"></i> Delete Pin</button>`;
        domString += '  </div>';
        domString += '</div>';
      });
      domString += `<button class="btn btn-danger red-btn add-pin" id="${idThatBoard}"><i class="fas fa-plus"></i> New Pin</button>`;
      domString += '</div>';
      utils.printToDom('single-container', domString);
      $('body').on('click', '.add-pin', newPinForm.pinFormBuilder);
    });
};

// TARGETS THE BOARD CLICKED ON AND PASSES INTO PINCARDBUILDER
// ASSIGNS CLICK EVENTS FOR DELETE PIN BUTTONS
const pinBuilder = (e) => {
  const boardId = e.target.closest('.card').id;
  pinCardBuilder(boardId);
  $('body').on('click', '.delete-btn', deletePin);
};

export default { pinBuilder, submitNewPin };
