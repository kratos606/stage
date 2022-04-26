const router = require('express').Router();
const {verifyToken} = require('../middlewares/verifyToken');
const {createPlan,updatePlan,deletePlan,getAllPlans} = require('../controllers/plan');

router.post('/',verifyToken, createPlan)
router.delete('/:id',verifyToken, deletePlan)
router.put('/:id',verifyToken, updatePlan)
router.get("/",verifyToken, getAllPlans);

module.exports = router;