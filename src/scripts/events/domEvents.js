import { deleteBook, getSingleBook } from '../../api/bookData';
import { viewBookDetails, viewAuthorDetails, deleteAuthorBooks } from '../../api/mergedData';
import { showBooks } from '../components/pages/books';
import viewBook from '../components/pages/viewBook';
import showAuthors from '../components/pages/authors';
import viewBooksByAuthor from '../components/pages/viewAuthor';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { getSingleAuthor, updateAuthor } from '../../api/authorData';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey, uid).then((booksArray) => showBooks(booksArray));
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(uid, bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      viewBookDetails(bookFirebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, authorFirebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(authorFirebaseKey, uid).then(showAuthors);
      }
    }
    // View Author Button
    if (e.target.id.includes('view-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then(viewBooksByAuthor);
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      getSingleAuthor(authorFirebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }

    if (e.target.id.includes('add-favorite-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      getSingleAuthor(authorFirebaseKey).then((response) => {
        response.favorite = true;
        updateAuthor(response, uid).then((authorsArray) => showAuthors(authorsArray));
      });
    }

    if (e.target.id.includes('favorite-author-span')) {
      console.warn(e.target.id);
      const [, authorFirebaseKey] = e.target.id.split('--');
      getSingleAuthor(authorFirebaseKey).then((response) => {
        response.favorite = false;
        updateAuthor(response, uid).then((authorsArray) => showAuthors(authorsArray));
      });
    }
  });
};

export default domEvents;
