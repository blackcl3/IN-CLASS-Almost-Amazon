import axios from 'axios';
import firebaseConfig from './apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// TODO: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      getBooks(uid).then((booksArray) => resolve(booksArray));
    })
    .catch((error) => reject(error));
});

const getBooksByAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve((response.data)))
    .catch((error) => reject(error));
});

// TODO: CREATE BOOK
function createBook(newBook, uid) {
  return new Promise((resolve, reject) => {
    axios.post(`${dbUrl}/books.json`, newBook)
      .then((response) => {
        const payload = { firebaseKey: response.data.name };
        axios.patch(`${dbUrl}/books/${payload.firebaseKey}.json`, payload)
          .then(() => {
            getBooks(uid)
              .then(resolve);
          });
      }).catch(reject);
  });
}

// TODO: UPDATE BOOK
const updateBook = (bookObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj)
    .then(() => resolve(getBooks(uid)))
    .catch(reject);
});

// TODO: FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => {
  getBooks(uid)
    .then((response) => resolve(response.filter((book) => book.sale)))
    .catch((error) => reject(error));
});

// TODO: STRETCH...SEARCH BOOKS

const searchBooks = (uid, searchValue) => new Promise((resolve, reject) => {
  getBooks(uid)
    .then((response) => resolve(response.filter((book) => book.title.toLowerCase().includes(searchValue))))
    .catch((error) => reject(error));
});

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getBooksByAuthor,
  getSingleBook,
  updateBook,
  searchBooks
};
