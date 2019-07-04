import { Mongo } from './api/database/mongo';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');

const indexRouter = require('./api/routes/index');
const authRouter = require('./api/routes/auth');
const usersRouter = require('./api/routes/users');
const videosRouter = require('./api/routes/videos');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').load();
}

const mongo = new Mongo();
mongo.connection(process.env.DB_IN_MEMORY === 'true');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'api/public'),
  dest: path.join(__dirname, 'api/public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use('/api/public', express.static(path.join(__dirname, 'api/public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/videos', videosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
