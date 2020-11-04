const router = require('express').Router();
const loginService = require('./login.service');
const { request } = require('../app');

router.post('/', async (req, res) => {
    const {login, password} = req.body;

    const token = await loginService.singToken(login, password);
    console.log(`token ${token}`);
    if (!token) {
        res.sendStatus(403);
    } else {
        res.status(200).json({token});
    }
});

module.exports = router;