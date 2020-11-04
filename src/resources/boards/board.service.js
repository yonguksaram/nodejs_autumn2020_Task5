const boardsRepo = require('./board.memory.repository');

function getAll() {
  return boardsRepo.getAll();
}

function getBoardById(boardId) {
  return boardsRepo.getBoardById(boardId);
}

function createBoard(board) {
  return boardsRepo.createBoard(board);
}

// const createBoard = board => boardsRepo.createBoard(board);

function updateBoard(board) {
  return boardsRepo.updateBoard(board);
}

function deleteBoard(boardId) {
  return boardsRepo.deleteBoard(boardId)
}

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
