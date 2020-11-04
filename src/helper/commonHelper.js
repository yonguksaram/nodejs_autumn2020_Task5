const fs = require('fs');
const db = require('./database');
const { v4: uuidv4 } = require('uuid');
const { NOT_FOUND } = require('http-status-codes');

class CommonHelper {
    static async getAllItems(path) {
        let result = db[path];
        if (result) {
            return result;
        } else {
            throw new Error(NOT_FOUND);
        }
    }

    static async getItem(path, itemId) {
        let result = db[path].find(item => item.id === itemId);
        if (result) {
            return result;
        } else {
            throw new Error(NOT_FOUND);
        }
    }

    static async createItem(path, item) {
        item.id = uuidv4();
        db[path] = [...db[path], item];
        return item;
    }

    static async updateItem(path, updatedItem) {
        let existingItem = db[path].find(item => item.id === updatedItem.id);
        if (existingItem) {
            const updatedItems = db[path].filter(item => item.id !== updatedItem.id);
            db[path] = [...updatedItems, updatedItem];
            return updatedItem;
        } else {
            throw new Error(NOT_FOUND);
        }
    }

    static async deleteItem(path, itemId, responseString) {
        let existingItem = db[path].find(item => item.id === itemId);
        if (existingItem) {
            const deletedItem = db[path].find(item => item.id === itemId);
            const updatedItems = db[path].filter(item => item.id !== itemId);
            db[path] = [...updatedItems];
            if (path === 'boards') {
                let newTasks = db.tasks.filter(item => item.boardId !== itemId);
                db.tasks = [...newTasks];
            }
            if (path === 'users') {
                let newTasks = db.tasks.map(item => {
                    item.userId = item.userId === itemId ? null : item.userId;
                    return item;
                });
                db.tasks = [...newTasks];
            }
            return deletedItem;
        } else {
            throw new Error(NOT_FOUND);
        }
    }
}

module.exports = {
    CommonHelper
};
