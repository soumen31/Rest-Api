const router = require('express').Router();
const userController = require('../controllers/User.controller');

router.get('/users', usercontroller.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;