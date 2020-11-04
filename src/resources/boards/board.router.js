const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const customLogger = require('../../helper/customLogger');

router.get('/', async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.createBoard(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(Board.toResponse(board));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const board = await boardsService.getBoardById(req.params.id);
    res.status(200);
    res.json(Board.toResponse(board));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const board = await boardsService.updateBoard(req.body);
    res.status(200);
    res.json(Board.toResponse(board));
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await boardsService.deleteBoard(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    customLogger.error(error.stack);
    res.sendStatus(404);
  }
});

module.exports = router;
