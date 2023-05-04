// add middlewares here related to projects
const Project = require('./projects-model');


async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (!project) {
            res.status(404).json({
                message: 'Invaild id; project id not found'
            });
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
        });
    } else {
        next();
    }
}

module.exports = { validateProjectId, validateProjectBody };
