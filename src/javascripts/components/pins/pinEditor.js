import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

// BUILDS INPUT FORM
const showPinEditor = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  let domString = '';
  domString += `<h2 id=${pinId}>Edit Pin</h2>`;
  domString += '<div class="dropdown">';
  domString += '  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Board:</button>';
  const currentUserUid = firebase.auth().currentUser.uid;
  boardData.getUserBoards(currentUserUid)
    .then((boards) => {
      boards.forEach((b) => {
        domString += '  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
        domString += `<a class="dropdown-item" id="${b.id}">${b.name}</a`;
      });
      domString += '  </div></div>';
      utils.printToDom('single-container', domString);
    })
    .catch((err) => console.error('problem with boardBuilder', err));

  utils.printToDom('single-container', domString);
  console.error(pinId);
};

export default { showPinEditor };
