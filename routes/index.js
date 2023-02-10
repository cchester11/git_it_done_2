const router = require('express').Router()
const homepage = require('./client/homepage.js')

router.use('/', homepage)

module.exports = router;