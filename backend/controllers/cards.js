const Card = require('../models/cards');
const { NotFoundError } = require('../errors/index');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { messages } = require('../errors/const');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError(messages.card.notFound);
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удалять можно только свою карточку');
      }
      Card.deleteOne(card)
        .then(() => {
          res.send({ message: messages.card.delete });
        })
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(messages.card.notFound);
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(messages.card.notFound);
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
};
