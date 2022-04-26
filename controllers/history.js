const History = require('../models/history')

// get All Histories

const getAllHistories = async (req, res) => {
    try {
        const histories = await History.find().sort('-date').populate('user');
        res.status(200).json(histories);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {getAllHistories}