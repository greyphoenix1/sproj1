const express = require('express');
const router = express.Router();
const {login, register} = require("../controller/controller");

router.route('/register').get(register);
router.route('/login').get(login);

module.export = router;