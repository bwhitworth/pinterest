import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// GETS DATA FROM PINS.JSON IN FIREBASE,
// RETRIEVES DATA FOR PINS THAT BELONG TO CLICKED BOARD (BY boardId)
// ADDS NEW ID KEY TO EACH OBJECT, THEN PUSHES INTO EMTPY ARRAY (boardPins)
const getPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const thesePins = response.data;
      const boardPins = [];
      Object.keys(thesePins).forEach((pinId) => {
        thesePins[pinId].id = pinId;
        boardPins.push(thesePins[pinId]);
      });
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

// PUSHES NEW PIN OBJECT INTO FIREBASE DATA COLLECTION
const addNewPin = (pinObject) => axios.post(`${baseUrl}/pins.json`, pinObject);

// PUSHES UPDATED KEY FOR A PIN OBJECT INTO FIREBASE DATA COLLECTION
const updatePin = (newBoardAssignment, pinId) => axios.patch(`${baseUrl}/pins/${pinId}.json`, { boardId: newBoardAssignment });

// CAPTURES ID OF PIN TO EDIT, FROM THE SAVE BUTTON (PASSED FORWARD)
// CAPTURES WHICH RADIO BUTTON HAS BEEN SELECTED
// CALLS AXIOS TO UPDATE THE PIN WITH BOARD SELECTION
// REFRESHES THE CURRENT VIEW OF PINS TO A SAVE CONFIRMATION MESSAGE
const submitPinChange = (e) => {
  const pinId = e.target.closest('.save-btn').id;
  const selectedBoard = utils.getRadioVal();
  updatePin(selectedBoard, pinId);
  $('#single-container').html('<h2>Saved!</h2>');
};

export default { getPins, addNewPin, submitPinChange };
