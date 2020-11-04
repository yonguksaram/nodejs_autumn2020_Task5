const User = require('../resources/users/user.model');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');

async function singToken(login, passwordOuter) {
    let user = await User.findOne({login: login}).exec();

    if (!user) {
        return null;
    }

    const {id, password} = user;
    if (bcrypt.compareSync(passwordOuter, password)) {
        const token = jwt.sign({id, login}, JWT_SECRET_KEY);
        return token
    } else {
        return null;
    }
}

module.exports = {
    singToken
}