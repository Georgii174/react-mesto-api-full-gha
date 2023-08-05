const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { NotFoundError } = require('../errors/index');
// const { UnauthorizedError } = require('../errors/unauthorized');
const { messages } = require('../errors/const');
const { JWT_SECRET } = require('../envConfig');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const {
        _id, name, about, avatar, email,
      } = user;
      res.status(201).send({
        _id, name, about, avatar, email,
      });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(messages.user.notFound);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(messages.user.notFound);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser, getUsers, getUserById, updateUser, login, getCurrentUser,
};
