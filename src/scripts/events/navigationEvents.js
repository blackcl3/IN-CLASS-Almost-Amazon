import { getAuthors, filterFavoriteAuthors } from '../../api/authorData';
import { booksOnSale, getBooks, searchBooks } from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import signOut from '../helpers/auth/signOut';
import showAuthors from '../components/pages/authors';

// navigation events
const navigationEvents = (uid) => {
// LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then((saleBooksArray) => showBooks(saleBooksArray));
  });

  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then((booksArray) => showBooks(booksArray));
  });

  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then((authorsArray) => showAuthors(authorsArray));
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    filterFavoriteAuthors(uid).then((favoriteAuthorsArray) => showAuthors(favoriteAuthorsArray));
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
    // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
    // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
    // OTHERWISE SHOW THE STORE
      searchBooks(uid, searchValue).then((booksArray) => showBooks(booksArray));
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
