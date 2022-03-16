const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');

const loggerMiddleware = require('./middlewares/logger');
const errorMiddleware  = require('./middlewares/error');

const indexRouter  = require('./routes/index');
const bookUIRouter = require('./routes/books');
const userRouter   = require('./routes/api/user');
const booksRouter  = require('./routes/api/books');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(cors());
app.use(loggerMiddleware);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/books', bookUIRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});