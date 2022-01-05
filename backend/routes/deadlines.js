const router = require('express').Router();
let Deadline = require('../models/deadline.model');

router.route('/').get((req, res) => {
    Deadline.find().sort({dueDate: 1})
    .then(deadlines => res.json(deadlines))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const course = req.body.course;
    const description = req.body.description;
    const weight = Number(req.body.weight);
    const dueDate = Date.parse(req.body.dueDate);

    const newDeadline = new Deadline({
        course,
        description,
        weight,
        dueDate,
    });

    newDeadline.save()
    .then(() => res.json('Deadline added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Deadline.findById(req.params.id)
    .then(deadline => res.json(deadline))
    .catch(err => res.status(400).json('Error test: ' + err));
});

router.route('/:id').delete((req, res) => {
    Deadline.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deadline deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Deadline.findById(req.params.id)
    .then(deadline => {
        deadline.course = req.body.course;
        deadline.description = req.body.description;
        deadline.weight = Number(req.body.weight);
        deadline.dueDate = Date.parse(req.body.dueDate);

        deadline.save()
        .then(() => res.json('Deadline updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;