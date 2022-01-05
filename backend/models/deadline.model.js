const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deadlineSchema = new Schema({
    course: { type: String, require: true},
    description: { type: String, require: true},
    weight: { type: Number, require: true},
    dueDate: { type: Date, require: true},
}, {
    timestamps: true,
});

const Deadline = mongoose.model('Deadline', deadlineSchema);

module.exports = Deadline;