# how to use

npm run dev

## structure Book

{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}

## API

POST    /api/user/login
  returns { id: 1, mail: "test@mail.ru" }

GET     /api/books/
  returns Book[]

GET     /api/books/
  returns Book[]

GET     /api/books/:id
  returns Book by id or 'Code 404'

POST    /api/books/
  creates new Book; returns Book[]; requires structure Book in body

PUT     /api/books/:id
  updates Book by id; returns Book by id or 'Code 404'; requires structure Book in body

DELETE  /api/books/:id
  deletes Book by id; returns 'ok' or 'Code 404'
