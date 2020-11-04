const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const customLogger = require('../../helper/customLogger');

router.get('/', async (req, res) => {

  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await usersService.createUser(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.json(User.toResponse(user));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.status(200);
    res.json(User.toResponse(user));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await usersService.updateUser(req.body);
    res.status(200);
    res.json(User.toResponse(user));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await usersService.deleteUser(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

module.exports = router;
