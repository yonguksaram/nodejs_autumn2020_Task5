const tasksRepo = require('./task.memory.repository');

function getAll() {
  return tasksRepo.getAll();
}

function getTaskById(taskId) {
  return tasksRepo.getTaskById(taskId);
}

function createTask(task, boardId) {
  return tasksRepo.createTask(task, boardId);
}

function updateTask(task) {
  return tasksRepo.updateTask(task);
}

function deleteTask(taskId) {
  return tasksRepo.deleteTask(taskId)
}

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
