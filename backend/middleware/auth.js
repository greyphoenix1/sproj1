const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const authMiddleware = async (req, res, next) => {
    //set header as token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'unauthorized'});
    }

    //extract just the token
    const token = authHeader.split(' ')[1];

    try {
        //verify token
        const payload = jwt.verify(token, process.env.jwt_top_secret);
        req.user = { userId: payload.userId, name: payload.name};
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'unauthorized'});
    }
}

module.exports = authMiddleware;