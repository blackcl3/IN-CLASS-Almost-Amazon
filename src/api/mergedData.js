import { deleteSingleAuthor, getSingleAuthor } from './authorData';
// eslint-disable-next-line no-unused-vars
import { getSingleBook, getBooksByAuthor, deleteBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    })
    .catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getBooksByAuthor(authorFirebaseKey)
        .then((bookObject) => {
          resolve({ authorObject, bookObject });
        });
    })
    .catch((error) => reject(error));
});

const deleteAuthorBooks = (authorFirebaseKey, uid) => new Promise((resolve, reject) => {
  getBooksByAuthor(authorFirebaseKey)
    .then((bookArray) => {
      const deleteBookPromises = bookArray.map((book) => deleteBook(book.firebaseKey));
      Promise.all(deleteBookPromises).then(() => {
        deleteSingleAuthor(authorFirebaseKey, uid).then(resolve);
      });
    }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
