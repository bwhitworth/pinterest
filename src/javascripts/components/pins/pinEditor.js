import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

// BUILDS INPUT FORM
const showPinEditor = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  let domString = '';
  domString += `<h2 id=${pinId}>Edit Pin</h2>`;
  domString += '<div class="custom-control custom-radio col">';
  const currentUserUid = firebase.auth().currentUser.uid;
  boardData.getUserBoards(currentUserUid)
    .then((boards) => {
      boards.forEach((b) => {
        domString += `<input type="radio" id="${b.id}" name="customRadio" class="custom-control-input board-radio-btns">`;
        domString += `<label class="custom-control-label pr-2" for="${b.name}">${b.name}</label><br>`;
      });
      domString += '  </div>';
      utils.printToDom('single-container', domString);
    })
    .catch((err) => console.error('problem with boardBuilder', err));
  console.error(pinId);
};

export default { showPinEditor };
