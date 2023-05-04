// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProjectBody } = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(pro => {
            res.json(pro);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error to get Projects'
            })
        });
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

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: 'Error in post router',
    });
});






module.exports = router;