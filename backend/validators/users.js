const { celebrate, Joi } = require('celebrate');
const { imageLinkRegex } = require('../errors/regex');

const signupCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(imageLinkRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarCelebrate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(imageLinkRegex),
  }),
});

const userIdCelebrate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signupCelebrate, signinCelebrate, updateUserCelebrate, updateAvatarCelebrate, userIdCelebrate,
};
