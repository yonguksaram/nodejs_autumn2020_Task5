const { CommonHelper } = require('../../../src/helper/commonHelper');
const fs = require('fs');
const Board = require('./board.model');
const Task = require('../tasks/task.model');

const db = require('../../../src/helper/database');
const { v4: uuidv4 } = require('uuid');

async function getAll() {
  let allBoards = await Board.find({}).exec();
  return Board.find({});
}

async function getBoardById(boardId) {
  let board =  await Board.findOne({_id: boardId}).exec();
  return Board.findOne({_id: boardId});
}

async function createBoard(board) {
  return Board.create(board);
}

async function updateBoard(board) {
  return Board.updateOne({_id: board.id}, board)
}

async function deleteBoard(boardId) {
  await Task.deleteMany({boardId: boardId}).exec();
  return Board.deleteOne({_id: boardId});
}

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
