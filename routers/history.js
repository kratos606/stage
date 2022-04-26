const router = require('express').Router()
const {verifyToken} = require('../middlewares/verifyToken')
const {getAllHistories} = require('../controllers/history')

router.get('/',verifyToken, getAllHistories)

module.exports = router;