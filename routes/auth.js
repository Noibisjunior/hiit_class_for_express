const express = require('express')
const router = express.Router()

const {register, login,registerPage,loginPage,dashboard} = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)

router.route('/register').get(registerPage)
router.route('/login').get(loginPage)
router.route('/dashboard').get(dashboard)

module.exports = router