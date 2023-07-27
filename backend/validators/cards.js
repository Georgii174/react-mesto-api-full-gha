const { celebrate, Joi } = require('celebrate');
const { imageLinkRegex } = require('../errors/regex');

const createCardCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(imageLinkRegex),
  }),
});

const cardIdCelebrate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = { createCardCelebrate, cardIdCelebrate };
