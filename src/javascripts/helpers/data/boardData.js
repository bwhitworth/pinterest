import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// GETS DATA FROM BOARDS.JSON IN FIREBASE,
// RETRIEVES DATA FOR BOARDS THAT BELONG TO LOGGED IN USER (uid SAME)
// ADDS NEW ID KEY TO EACH OBJECT, THEN PUSHES INTO EMPTY ARRAY (userBoards) FOR CONSUMPTION
const getUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const theseUserBoards = response.data;
      const userBoards = [];
      Object.keys(theseUserBoards).forEach((userBoardId) => {
        theseUserBoards[userBoardId].id = userBoardId;
        userBoards.push(theseUserBoards[userBoardId]);
      });
      resolve(userBoards);
    })
    .catch((err) => reject(err));
});

// PUSHES NEW BOARD OBJECT INTO FIREBASE DATA COLLECTION
const addBoard = (boardObject) => axios.post(`${baseUrl}/boards.json`, boardObject);

export default { getUserBoards, addBoard };
