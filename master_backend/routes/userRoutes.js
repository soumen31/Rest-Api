
const express = require('express');
const userController = require('../controllers.js/userController');
const { protect, authorize } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
