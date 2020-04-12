import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

// GETS ID OF PIN TO BE EDITED
// BUILDS RADIO BUTTON GROUP OF EXISTING BOARDS FOR SELECTION
const showPinEditor = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  let domString = '';
  domString += `<h2 id=${pinId}>Edit Pin</h2>`;
  domString += '<p>Select Board:</p>';
  const currentUserUid = firebase.auth().currentUser.uid;
  boardData.getUserBoards(currentUserUid)
    .then((boards) => {
      boards.forEach((b) => {
        domString += '<div class="form-check col-10">';
        domString += `  <input class="form-check-input board-radio-btn" type="radio" name="exampleRadios" id="${b.id}" value="option2">`;
        domString += `  <label class="form-check-label" for="exampleRadios2">${b.name}</label>`;
        domString += '</div>';
      });
      domString += `<button class="btn btn-secondary save-btn red-btn" id="${pinId}"><i class="fas fa-check-circle"></i> Save</button>`;
      utils.printToDom('single-container', domString);
    })
    .catch((err) => console.error('problem with boardBuilder', err));
};

export default { showPinEditor };
