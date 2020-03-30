import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

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
