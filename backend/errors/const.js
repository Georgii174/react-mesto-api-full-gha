const messages = {
  common: {
    badId: 'Передан некорректный _id',
    notFound: 'По указанному пути ничего не найдено',
    serverError: 'На сервере произошла ошибка',
  },

  user: {
    notFound: 'Пользователь по указанному _id не найден',
    createBadData: 'Переданы некорректные данные при создании пользователя',
    updateBadData: ' Переданы некорректные данные при обновлении профиля',
    updataWrongFields: 'Переданы некорректные поля для обновлении пользователя',
    loginBadData: 'Передан неверный логин или пароль',
    conflictEmail: 'Пользователь с указанным email уже существует',
  },

  card: {
    notFound: 'Карточка с указанным _id не найдена.',
    badData: 'Переданы некорректные данные при создании карточки',
    delete: 'Карточка успешно удалена',
  },
};

const statusCodes = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  default: 500,
};

module.exports = { messages, statusCodes };
