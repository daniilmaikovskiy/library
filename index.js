const express = require('express');
const cors = require('cors');
const formData = require('express-form-data');
const { Book } = require('./book');

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

const app = express();

app.use(formData.parse());
app.use(cors());

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books/', (req, res) => {
  const { books } = store;

  res.status(200);
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books/', (req, res) => {
  const { books } = store;

  const newBook = new Book(req.body);

  books.push(newBook);

  res.status(201);
  res.json(books);
});

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});