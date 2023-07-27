const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');
const {
  updateAvatarCelebrate,
  updateUserCelebrate,
  userIdCelebrate,
} = require('../validators/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdCelebrate, getUserById);
router.post('/', createUser);
router.patch('/me', updateUserCelebrate, updateUser);
router.patch('/me/avatar', updateAvatarCelebrate, updateUser);

module.exports = {
  usersRoutes: router,
};
