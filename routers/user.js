const router = require('express').Router();
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken')
const {createUser,updateUser,deleteUser,getAllUsers} = require('../controllers/user');

router.post('/',verifyTokenAndAdmin,createUser)
router.put('/:id',verifyTokenAndAdmin,updateUser)
router.delete('/:id',verifyTokenAndAdmin,deleteUser)
router.get('/',verifyTokenAndAdmin,getAllUsers)

module.exports = router;