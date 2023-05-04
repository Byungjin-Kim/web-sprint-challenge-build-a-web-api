// add middlewares here related to actions
const Action = require('./actions-model');


async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id);
        if (!action) {
            res.status(404).json({
                message: 'Invaild id; id not found'
            });
        } else {
            req.action = action;
            next();
        }
    } catch (error) {
        next(error);
    }
}

function validateActionTable(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    if (!project_id || !description || !notes || !(completed === false || completed === true)) {
        res.status(400).json({
            message: 'missing the required fields'
        });
    } else {
        next();
    }
}

module.exports = { validateActionId, validateActionTable };
