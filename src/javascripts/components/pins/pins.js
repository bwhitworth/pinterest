import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// HIDES THE SINGLE BOARD MODAL
const closeSingleBoardView = () => {
  $('#singleBoardModal').modal('hide');
};

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

// GETS PINS FOR THE BOARD THAT WAS PASSED IN
// BUILDS (MINI) CARD FOR EACH PIN AND PRINTS INTO BOARD CONTAINER
const pinCardBuilder = (boardId) => {
  pinData.getPins(boardId)
    .then((board) => {
      let domString = '';
      domString += '<div class="row">';
      board.forEach((p) => {
        domString += `<div class="card pin-card" id="${p.id}" style="width: 30%">`;
        domString += '  <div class="img-container">';
        domString += `    <img src="${p.imageUrl}" class="card-img-top">`;
        domString += '  </div>';
        domString += `  <div class="card-body" id="${boardId}">`;
        domString += `    <p class="card-text">${p.name}</p>`;
        domString += `    <button class="btn btn-secondary delete delete-btn" id="delete-${p.id}"><i class="far fa-trash-alt text-white"></i> Delete Pin</button>`;
        domString += '  </div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('single-board-modal', domString);
    });
};

// TARGETS THE BOARD CLICKED ON AND PASSES INTO PINCARDBUILDER
// OPENS SINGLE BOARD VIEW MODAL
// ASSIGNS CLICK EVENTS FOR: CLOSE SINGLE BOARD VIEW MODAL AND DELETE PIN BUTTONS
const pinModalBuilder = (e) => {
  const boardId = e.target.closest('.card').id;
  pinCardBuilder(boardId);
  $('#singleBoardModal').modal('show');
  $('#close-board').on('click', closeSingleBoardView);
  $('body').on('click', '.delete-btn', deletePin);
};

export default { pinModalBuilder };
