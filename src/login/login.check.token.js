const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const whitelistRoutes = ["/", "/doc", "/login"];

module.exports = (req, res, next) => {
    if (whitelistRoutes.includes(req.path)) {
        return next();
    }
    const authHeader = req.header("Authorization");
    console.log(`authHeader ${authHeader}`);
    if (authHeader) {
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer") {
            res.status(401).send('Forbidden1');
            console.log('Forbidden1');
            return;
        }
        try {
            const verification = jwt.verify(token, JWT_SECRET_KEY);
        } catch (error) {
            res.status(401).send('Forbidden2');
            console.log('Forbidden2');
            return;
        }
        return next();
    }
    res.status(401).send('Forbidden3');
}