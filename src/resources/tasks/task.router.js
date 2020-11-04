const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const customLogger = require('../../helper/customLogger');

router.get('/', async (req, res) => {
  try {
    const tasks = await tasksService.getAll();
    res.status(200).json(tasks.map(Task.toResponse));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  try {
    const boardId = req.boardId;
    const task = await tasksService.createTask(req.body, boardId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(Task.toResponse(task));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await tasksService.getTaskById(req.params.id);
    res.status(200);
    res.json(Task.toResponse(task));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await tasksService.updateTask(req.body);
    res.status(200);
    res.json(Task.toResponse(task));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await tasksService.deleteTask(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

module.exports = router;
