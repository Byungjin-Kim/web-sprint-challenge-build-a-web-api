// add middlewares here related to projects

const Project = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (!project) {
            res.status(404).json({
                message: 'project id not found'
            })
        } else {
            req.project = project;
            next();
        }
    } catch (error) {
        next(error);
    }
}

function validateProjectBody(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !description || !(completed === false || completed === true)) {
        res.status(400).json({
            message: 'missing the required fields'
        })
    } else {
        req.name = name;
        req.description = description;
        req.completed = completed;
        next();
    }
}

async function checkId(req, res, next) {
    try {
        const pro = await Project.get(req.params.id);
        if (pro) {
            req.pro = pro; // saves other middlewarws a db trip
            next();
        } else {
            // outcome 3: send an error to the err handling middleware
            next({ status: 404, message: 'not found!' });
        }
    } catch (error) {
        next(error);
    }
}



module.exports = { validateProjectId, validateProjectBody, checkId }
