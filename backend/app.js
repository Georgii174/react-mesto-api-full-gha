const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { NotFoundError } = require('./errors/NotFoundError');
const { messages } = require('./errors/const');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/users');
const { authMiddleware } = require('./middlewares/auth');
const { errorsMiddleware, errorMiddleware } = require('./middlewares/error');
const { signinCelebrate, signupCelebrate } = require('./validators/users');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connected!');
  })
  .catch((error) => {
    console.log('No Connected!', error);
  });

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', signupCelebrate, createUser);
app.post('/signin', signinCelebrate, login);
app.use(authMiddleware);
app.use('/users', userRouter.usersRoutes);
app.use('/cards', cardRouter.cardsRoutes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((req, res, next) => {
  next(new NotFoundError(messages.common.notFound));
});
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Запуск сервера');
});
