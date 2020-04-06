import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// HIDES THE SINGLE BOARD MODAL
// const closeSingleBoardView = () => {
//   $('#singleBoardModal').modal('hide');
// };

let openBoard = '';

// DELETES SINGLE PIN WHEN TRASH BUTTON IS CLICKED
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
        domString += `    <button class="btn btn-secondary delete-btn" id="delete-${p.id}"><i class="far fa-trash-alt text-white"></i></button>`;
        domString += '  </div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('single-board', domString);
    });
};

// CALLS getPins TO GET ONLY PINS BELONGING TO THE BOARD CLICKED ON
// BUILDS (MINI) CARD FOR EACH PIN AND PRINTS INTO MODAL CONTAINER
// ASSIGNS CLICK EVENTS FOR: CLOSE SINGLE BOARD VIEW AND DELETE PINS
const pinModalBuilder = (e) => {
  const boardId = e.target.closest('.card').id;
  openBoard = e.target.closest('.card').id;
  pinCardBuilder(boardId);
  // $('#singleBoardModal').modal('show');
  // $('#close-board').on('click', closeSingleBoardView);
  $('body').on('click', '.delete-btn', deletePin);
  console.error('board:', openBoard);
};

export default { pinModalBuilder };
