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

1. POST    /api/user/login
  - returns { id: 1, mail: "test@mail.ru" }

2. GET     /api/books/
  - returns Book[]

3. GET     /api/books/
  - returns Book[]

4. GET     /api/books/:id
  - returns Book by id or 'Code 404'

5. POST    /api/books/
  - creates new Book; returns Book[]; requires structure Book in body

6. PUT     /api/books/:id
  - updates Book by id; returns Book by id or 'Code 404'; requires structure Book in body

7. DELETE  /api/books/:id
  - deletes Book by id; returns 'ok' or 'Code 404'
