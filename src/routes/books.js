const express = require('express');
const { Book } = require('../models/book');

const router = express.Router();

const store = {
  books: [
    new Book({ title: 'first', desc: 'desc' }),
    new Book({ title: 'second', desc: 'desc' }),
    new Book({
      title:'my book',
      desc: 'gg',
      authors: 'I am',
      favorite: 'for me',
      fileCover: 'nice cover',
      fileName: 'index.js',
    }),
  ],
};

router.get('/', (req, res) => {
  const { books } = store;

  res.status(200);
  res.json(books);
});

router.get('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.status(200);
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('Code: 404');
  }
});

router.post('/', (req, res) => {
  const { books } = store;

  const newBook = new Book(req.body);

  books.push(newBook);

  res.status(201);
  res.json(books);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { books } = store;

  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
      books[idx] = { ...(new Book({ ...books[idx], ...req.body}, books[idx].id)) };

      res.json(books[idx]);
  } else {
      res.status(404);
      res.json('Code: 404');
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { books } = store;
  
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
      books.splice(idx, 1);
      res.json('ok');
  } else {
      res.status(404);
      res.json('Code: 404');
  }
});

module.exports = router;