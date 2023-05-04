// Write your "actions" router here!
const express = require('express');
const { validateActionId, validateActionTable } = require('./actions-middlware');

const Action = require('./actions-model');

const router = express.Router();


router.get('/', (req, res, next) => {
    Action.get()
        .then(pro => {
            res.json(pro);
        })
        .catch(next);
});

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
});

router.post('/', validateActionTable, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next);
});

router.put('/:id', validateActionId, validateActionTable, async (req, res, next) => {
    try {
        const update = await Action.update(req.params.id, req.body);
        res.status(201).json(update);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id);
        res.json(req.action);
    } catch (error) {
        next(error);
    }
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: 'Error getting Actions',
    });
});

module.exports = router;
