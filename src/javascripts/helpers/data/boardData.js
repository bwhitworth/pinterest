import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// GETS DATA FROM BOARDS.JSON IN FIREBASE,
// RETRIEVES DATA FOR BOARDS THAT BELONG TO LOGGED IN USER (uid SAME)
// ADDS NEW ID KEY TO EACH OBJECT, THEN PUSHES INTO EMTPY ARRAY (userBoards)
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

const addNewBoard = () => {
  let lengthVar = 'one';
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      lengthVar = response.data.length; // this doesn't work
      console.error('lengthVar:', lengthVar);
    });
  const newBoard = {
    [lengthVar]: { // need something for it's id (board 6)... and what syntax?
      name: $('#input-board-name').val(),
      description: $('#input-board-desc').val(),
    },
  };
  console.error(newBoard);
};

export default { getUserBoards, addNewBoard };
