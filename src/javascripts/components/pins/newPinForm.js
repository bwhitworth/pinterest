import utils from '../../helpers/utils';

// BUILDS INPUT FORM
const pinFormBuilder = () => {
  let domString = '';
  domString += '<h2>New Pin:</h2>';
  domString += '<form>';
  domString += '<div class="form-group>';
  domString += '  <label for="input-pin-name">Pin Name:</label>';
  domString += '    <input class="form-control id="input-pin-name" type="text" placeholder="..."><br>';
  domString += '  <label for="input-pin-desc">Description:</label>';
  domString += '    <input class="form-control" id="input-pin-desc" type="text" placeholder="..."><br>';
  domString += '  <label for="input-pin-img">Image URL:</label>';
  domString += '    <input class="form-control" id="input-pin-img" type="text" placeholder="(optional)"><br>';
  domString += '  <button class="col-12 btn btn-danger red-btn" id="submit-new-pin">Submit</button>';
  domString += '</div>';
  domString += '</form>';
  utils.printToDom('single-container', domString);
};

export default { pinFormBuilder };
