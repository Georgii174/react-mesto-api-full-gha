const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  cardIdCelebrate,
  createCardCelebrate,
} = require('../validators/cards');

const router = express.Router();

router.get('/', getCards);
router.post('/', createCardCelebrate, createCard);
router.put('/:cardId/likes', cardIdCelebrate, likeCard);
router.delete('/:cardId', cardIdCelebrate, deleteCard);
router.delete('/:cardId/likes', cardIdCelebrate, dislikeCard);

module.exports = {
  cardsRoutes: router,
};
