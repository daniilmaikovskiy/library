const express = require('express');

const fileMiddleware = require('../middlewares/file');

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

router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
  const { books } = store;
  const { file, body } = req;

  const newBook = new Book(body);

  newBook.fileBook = file?.path || '';

  books.push(newBook);

  res.status(201);
  res.json(books);
});

router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const { file, body, params: { id } } = req;
  const { books } = store;

  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
      books[idx] = { ...(new Book({ ...books[idx], ...body}, books[idx].id)) };

      books[idx].fileBook = file?.path || books[idx].fileBook;

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

router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  const { books } = store;
  
  const idx = books.findIndex((el) => el.id === id);

  const filePath = idx !== -1 ? books[idx].fileBook : '';
  const fileName = idx !== -1 ? books[idx].title || id : '';

  res.download(filePath, `${fileName}.txt`, (err) => {
    if (err) {
      res.status(404);
      res.json('404 | Not Found');
    }
  });
});

module.exports = router;