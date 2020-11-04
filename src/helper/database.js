const data = require('../data/data.js');
class Database {
    constructor({ users = [], boards = [], tasks = [] }) {
        this.users = users;
        this.boards = boards;
        this.tasks = tasks;
    }
}

const db = new Database(data);

module.exports = db
;