const userSchema = require('../model/users');
const {StatusCodes} = require('http-status-codes');

const register = async (req, res) => {
    const user = await userSchema.create({ ...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ name: user.name, token});
}

const login = async (req, res) => {
    const {name, password} = req.body;
    const user = await userSchema.findOne({ name });

    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'User not found' });
    }

    const isCorrect = await user.comparePass(password);
    if (!isCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'wrong pass'});
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ token, msg: `welcome ${name}.`});
}

module.exports = {register, login};