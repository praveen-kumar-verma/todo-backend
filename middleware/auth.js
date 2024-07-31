// Middleware for handling auth
const jwt = require("jsonwebtoken");


function userAuthMiddleware(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).json({
            error: 'Access denied. No token provided.'
        });
    }
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({
            error:'Invalid token'
        });
    }

}

module.exports = userAuthMiddleware;