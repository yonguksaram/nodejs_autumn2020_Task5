const usersRepo = require('./user.memory.repository');
const fs = require('fs');

function getAll() {
  return usersRepo.getAll();
}

function getUserById(boardId) {
  return usersRepo.getUserById(boardId);
}

function createUser(board) {
  return usersRepo.createUser(board);
}

function updateUser(board) {
  return usersRepo.updateUser(board);
}

function deleteUser(boardId) {
  return usersRepo.deleteUser(boardId)
}

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
