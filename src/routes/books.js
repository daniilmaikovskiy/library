const express = require('express');
const router = express.Router();

const { Book } = require('../models/book');

const { getStore, setStore, store } = require('../store');

router.get('/', async (req, res) => {
  const books = store.books;

  res.render('books/index', { title: 'Книги', books });
});

router.get('/view/:id', (req, res) => {
  const { id } = req.params;

  const books = store.books;

  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    res.json('Not Found | 404');
  } else {
    res.render('books/view', { title: 'Книги', book: books[index] });
  }
});

router.get('/create', (req, res) => {
  res.render('books/create', { title: 'Книги', book: new Book() });
});

router.get('/update/:id', (req, res) => {
  const { id } = req.params;

  const books = getStore().books;

  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    res.json('Not Found | 404');
  } else {
    res.render('books/update', { title: 'Книги', book: books[index] });
  }
});

// post

router.post('/create', (req, res) => {
  const books = store.books;

  const { title, description } = req.body;

  const newBook = new Book({ title, description });

  books.push(newBook);

  setStore({ books });

  res.redirect('/books');
});

router.post('/update/:id', (req, res) => {
  const books = store.books;

  const { id } = req.params;

  const { title, description } = req.body;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
      books[idx] = { ...books[idx], title, description };

      setStore({ books });

      res.redirect(`/books/view/${id}`);
  } else {
      res.status(404);
      res.json('Not Found | 404')
  }
});

router.post('/delete/:id', (req, res) => {
  const books = store.books;

  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
      books.splice(idx, 1);

      setStore({ books });

      res.redirect(`/books`);
  } else {
      res.status(404);
      res.json('Not Found | 404');
  }
});

module.exports = router;