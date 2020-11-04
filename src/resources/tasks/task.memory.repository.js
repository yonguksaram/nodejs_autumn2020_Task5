const { CommonHelper } = require('../../../src/helper/commonHelper');
const fs = require('fs');
const Task = require('./task.model');

const db = require('../../../src/helper/database');
const { v4: uuidv4 } = require('uuid');

async function getAll() {
  let allTasks = await Task.find({}).exec();
  return Task.find({});
}

async function getTaskById(taskId) {
  let task = await Task.findOne({_id: taskId}).exec();
  return Task.findOne({_id: taskId});
}

async function createTask(task, boardId) {
  task.boardId = boardId;
  return Task.create(task);
}

async function updateTask(task) {
  return Task.updateOne({_id: task.id}, task)
}

async function deleteTask(taskId) {
  return Task.deleteOne({_id: taskId});
}

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
