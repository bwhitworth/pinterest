import utils from '../../helpers/utils';

// BUILDS INPUT FORM USED TO ADD NEW PIN
const pinFormBuilder = (e) => {
  const boardId = e.target.closest('.add-pin').id;
  let domString = '';
  domString += '<h2>New Pin:</h2>';
  domString += `<form class="pin-form col-10" id=${boardId}>`;
  domString += '  <div class="form-group>';
  domString += '    <br><label for="input-pin-n">Name:</label>';
  domString += '      <input class="form-control" id="input-pin-name" type="text" placeholder="name your pin">';
  domString += '    <br><label for="input-pin-img">Image URL:</label>';
  domString += '      <input class="form-control" id="input-pin-img" type="text" placeholder="photo to display">';
  domString += '    <br><button class="col-12 btn btn-danger red-btn" id="submit-new-pin">Submit</button>';
  domString += '  </div>';
  domString += '</form>';
  utils.printToDom('single-container', domString);
};

export default { pinFormBuilder };
