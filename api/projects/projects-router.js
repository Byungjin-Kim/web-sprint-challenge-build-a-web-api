// Write your "projects" router here!
const express = require('express');

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
        })
})



module.exports = router;