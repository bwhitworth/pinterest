import utils from '../../helpers/utils';

// BUILDS INPUT FORM USED TO ADD NEW BOARD
const boardFormBuilder = () => {
  let domString = '';
  domString += '<h2>New Board:</h2>';
  domString += '<form class="col-10">';
  domString += '  <div class="form-group>';
  domString += '    <label for="input-board-name">Board Name:</label>';
  domString += '      <input class="form-control input-board-name" id="input-board-name" type="text" placeholder="Inspiration">';
  domString += '    <br><label for="input-board-desc">Description:</label>';
  domString += '      <input class="form-control" id="input-board-desc" type="text" placeholder="New ideas that motivate me">';
  domString += '    <br><button class="col-12 btn btn-danger red-btn" id="submit-new-board">Submit</button>';
  domString += '  </div>';
  domString += '</form>';
  utils.printToDom('single-container', domString);
};

export default { boardFormBuilder };
