const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const users = [new User({ name: 'Juno', password: 'ddddd', login: 'cccccc' })];
const boards = [];
const tasks = [];

const connectionToDB = (callBack) => {
    mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // db.dropDatabase();
        callBack();
    });
}

module.exports = {
    users,
    boards,
    tasks,
    connectionToDB
};