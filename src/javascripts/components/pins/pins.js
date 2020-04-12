import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// DELETES SINGLE PIN WHEN TRASH BUTTON IS CLICKED
// THEN RE-PRINTS REMAINING PINS (REFRESHED VERSION)
const deletePin = (e) => new Promise((resolve, reject) => {
  const pinToDelete = e.target.closest('.pin-card').id;
  const parentBoard = e.target.closest('.card-body').id;
  axios.delete(`${baseUrl}/pins/${pinToDelete}.json`)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      pinCardBuilder(parentBoard);
    })
    .catch((err) => reject(err));
});

// TARGETS ID ATTACHED TO PIN FORM (CARRIED OVER PIN ID)
// CREATES NEW PIN OBJECT AND PERFORMS AXIOS POST
// RE-BUILDS THE PINS FOR THAT BOARD (REFRESHED VERSION)
const submitNewPin = (e) => {
  e.preventDefault();
  const boardTarget = e.target.closest('.pin-form');
  const newPin = {
    boardId: boardTarget.id,
    name: $('#input-pin-name').val(),
    imageUrl: $('#input-pin-img').val(),
  };
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
        domString += `<div class="card pin-card col-5" id="${p.id}">`;
        domString += '  <div class="img-container">';
        domString += `    <img src="${p.imageUrl}" class="card-img-top">`;
        domString += '  </div>';
        domString += `  <div class="card-body" id="${boardId}">`;
        domString += `    <p class="card-text">${p.name}</p>`;
        domString += `    <button class="btn btn-secondary delete delete-btn pin-btn" id="delete-${p.id}"><i class="far fa-trash-alt"></i> Delete</button>`;
        domString += '    <button class="btn btn-secondary edit edit-btn pin-btn""><i class="far fa-edit"></i> Edit</button>';
        domString += '  </div>';
        domString += '</div>';
      });
      domString += `<button class="btn btn-danger red-btn add-pin col-8" id="${idThatBoard}"><i class="fas fa-plus"></i> New Pin</button>`;
      domString += '</div>';
      utils.printToDom('single-container', domString);
    });
};

// TARGETS THE BOARD CLICKED ON AND PASSES INTO PINCARDBUILDER
// ASSIGNS CLICK EVENTS FOR DELETE PIN BUTTONS
const pinBuilderEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  pinCardBuilder(boardId);
  $('body').on('click', '.delete-btn', deletePin);
};

export default { pinBuilderEvent, submitNewPin };
