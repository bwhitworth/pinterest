import axios from 'axios';
import apiKeys from '../apiKeys.json';

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

export default { getPins };
