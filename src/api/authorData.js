import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// FIXME: CREATE AUTHOR
const createAuthor = (newAuthor, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, newAuthor)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${payload.firebaseKey}.json`, payload)
        .then(() => {
          getAuthors(uid)
            .then((authorsArray) => resolve(Object.values(authorsArray)));
        });
    })
    .catch((error) => reject(error));
});

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const filterFavoriteAuthors = (uid) => new Promise((resolve, reject) => {
  getAuthors(uid).then((response) => resolve(response.filter((author) => author.favorite)))
    .catch((error) => reject(error));
  // axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
  //   .then((response) => resolve(Object.values(response.data)))
  //   .catch((error) => reject(error));
});

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors().then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (authorObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj)
    .then(() => getAuthors(uid).then(resolve))
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  filterFavoriteAuthors
};
