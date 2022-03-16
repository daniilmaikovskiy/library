const express = require('express');

const fileMiddleware = require('../../middlewares/file');

const { Book } = require('../../models/book');
const { getStore, setStore } = require('../../store');

const router = express.Router();

router.get('/', (req, res) => {
  const { books } = getStore();

  res.status(200);
  res.json(books);
});

router.get('/:id', (req, res) => {
  const { books } = getStore();
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
  const { books } = getStore();
  const { file, body } = req;

  const newBook = new Book(body);

  newBook.fileBook = file?.path || '';

  books.push(newBook);

  setStore({ books });

  res.status(201);
  res.json(books);
});

router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const { file, body, params: { id } } = req;
  const { books } = getStore();

  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
      books[idx] = { ...(new Book({ ...books[idx], ...body}, books[idx].id)) };

      books[idx].fileBook = file?.path || books[idx].fileBook;

      setStore({ books });

      res.json(books[idx]);
  } else {
      res.status(404);
      res.json('Code: 404');
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { books } = getStore();
  
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
      books.splice(idx, 1);
      setStore({ books });

      res.json('ok');
  } else {
      res.status(404);
      res.json('Code: 404');
  }
});

router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  const { books } = getStore();
  
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