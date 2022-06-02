import { createAuthor, updateAuthor } from '../../api/authorData';
import { createBook, updateBook } from '../../api/bookData';
import showAuthors from '../components/pages/authors';
import { showBooks } from '../components/pages/books';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const newBook = {
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        title: document.querySelector('#title').value,
        author_id: document.querySelector('#author_id').value,
        uid
      };
      createBook(newBook, uid).then((updatedBooksArray) => showBooks(updatedBooksArray));
    }

    // TODO: CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const updatedBook = {
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        title: document.querySelector('#title').value,
        author_id: document.querySelector('#author_id').value,
        firebaseKey,
        uid
      };
      updateBook(updatedBook, uid).then((updatedBooksArray) => showBooks(updatedBooksArray));
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const newAuthor = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        uid
      };
      createAuthor(newAuthor, uid).then((authorsArray) => showAuthors(authorsArray));
    }
    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      const updatedAuthor = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        firebaseKey,
        uid
      };
      updateAuthor(updatedAuthor, uid).then((authorsArray) => showAuthors(authorsArray));
    }
  });
};

export default formEvents;
