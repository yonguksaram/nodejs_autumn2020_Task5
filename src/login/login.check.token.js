const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const whitelistRoutes = ["/", "/doc", "/login"];

module.exports = (req, res, next) => {
    if (whitelistRoutes.includes(req.path)) {
        return next();
    }
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer") {
            res.status(401).send('Forbidden');
            return;
        }
        try {
            const verification = jwt.verify(token, JWT_SECRET_KEY);
        } catch (error) {
            res.status(401).send('Forbidden');
            return;
        }
        return next();
    }
    res.status(401).send('Forbidden');
}