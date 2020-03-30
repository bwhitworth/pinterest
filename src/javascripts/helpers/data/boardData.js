import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

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

export default { getUserBoards };
