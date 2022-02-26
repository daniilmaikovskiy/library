const express = require('express');
const cors = require('cors');

const loggerMiddleware = require('./middlewares/logger');
const errorMiddleware  = require('./middlewares/error');

const indexRouter = require('./routes/index');
const userRouter  = require('./routes/user');
const booksRouter = require('./routes/books');

const app = express();

app.use(cors());
app.use(loggerMiddleware);
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});