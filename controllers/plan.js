const Plan = require('../models/plans');
const History = require('../models/history')

// Create a new plan

const createPlan = async (req, res) => {
    const { code_RLP,ordre_jour, ordre_lecture_paquet, tournée_debut, tournée_fin } = req.body;
    const plan = new Plan({ code_RLP, ordre_jour, ordre_lecture_paquet, tournée_debut, tournée_fin });
    await plan.save()
        .then(async() => {
		res.json({ success: true })
		const history = new History({
        		user: req.user.id,
        		action: 'Create',
        		data: plan
    		})
    		await history.save()
	})
        .catch(({ errors }) => {
            let listErrors = [];
            Object.keys(errors).forEach((fieldName) => {
                listErrors.push(errors[fieldName].message)
            })
            res.json({error:listErrors})
        });
}

// Delete a plan

const deletePlan = async (req, res) => {
    await Plan.findById(req.params.id)
        .then(async(plan) => {
            let currentPlan = plan
            plan.remove().then(() => res.json({ success: true }))
            const history = new History({
                user: req.user.id,
                action: 'Delete',
                data: currentPlan
            })
            await history.save()
        })
        .catch(err => res.json({ success: false }));
}

// update a plan

const updatePlan = async (req, res) => {
    const { code_RLP, ordre_jour, ordre_lecture_paquet, tournée_debut, tournée_fin } = req.body;
    await Plan.findById(req.params.id)
        .then(async(plan) => {
            let prevPlan = plan.toObject();
            plan.code_RLP = code_RLP;
            plan.ordre_jour = ordre_jour;
            plan.ordre_lecture_paquet = ordre_lecture_paquet;
            plan.tournée_debut = tournée_debut;
            plan.tournée_fin = tournée_fin;
            let currentPlan = plan;
            await plan.save()
                .then(() => {
                    res.json({ success: true })
                    if(JSON.stringify(prevPlan) !== JSON.stringify(currentPlan)){
                        const history = new History({
                            user: req.user.id,
                            action: 'Update',
                            data: {
                                prevPlan,
                                currentPlan
                            }
                        })
                        history.save()
                    }
                })
                .catch(({ errors }) => {
                    let listErrors = [];
                    Object.keys(errors).forEach((fieldName) => {
                        listErrors.push(errors[fieldName].message)
                    })
                    res.json({error:listErrors})
                });
            }
        )
        .catch(err => res.json({ err }));
}

// get All plans

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {createPlan,updatePlan,deletePlan,getAllPlans};