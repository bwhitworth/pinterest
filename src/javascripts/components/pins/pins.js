import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';

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
};

export default { pinBuilder };
