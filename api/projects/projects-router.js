// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProjectBody } = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();


router.get('/', (req, res, next) => {
    Project.get()
        .then(pro => {
            res.json(pro);
        })
        .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

router.post('/', validateProjectBody, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next);
});

router.put('/:id', validateProjectBody, validateProjectId, async (req, res, next) => {
    try {
        const update = await Project.update(req.params.id, req.body);
        res.status(201).json(update);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id);
        res.json(req.project);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: 'Error getting Projects',
    });
});

module.exports = router;
