import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';

// HIDES THE SINGLE BOARD MODAL
const closeSingleBoardView = () => {
  $('#singleBoardModal').modal('hide');
};

// CALLS getPins TO GET ONLY PINS BELONGING TO THE BOARD CLICKED ON
// BUILDS (MINI) CARD FOR EACH PIN AND PRINTS INTO MODAL CONTAINER
// ASSIGNS CLICK EVENT TO BUTTON WHICH CLOSES SINGLE BOARD MODAL
const pinBuilder = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.getPins(boardId)
    .then((board) => {
      let domString = '';
      domString += '<div class="row">';
      board.forEach((p) => {
        domString += '<div class="card pin-card" style="width: 30%">';
        domString += '  <div class="img-container">';
        domString += `    <img src="${p.imageUrl}" class="card-img-top">`;
        domString += '  </div>';
        domString += '  <div class="card-body">';
        domString += `    <p class="card-text">${p.name}</p>`;
        domString += '  </div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('single-board-modal', domString);
    })
    .catch((err) => console.error('problem with boardBuilder', err));
  $('#singleBoardModal').modal('show');
  $('#close-board').on('click', closeSingleBoardView);
};

export default { pinBuilder };
