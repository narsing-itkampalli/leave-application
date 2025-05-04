const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    leaveDue: {type: Date, required: false},
    leaveApplied: {type: Number, required: false},
    officeDate: {type: Date, required: false},
    signature: {type: String, requried: false},
    recommendation: {type: Number, requried: false},
    recommendationDate: {type: Date, required: false},
    dvcPvc: {type: String, required: false},
    sanctioned: {type: Number, required: false},
    sanctionDate: {type: Date, required: false},
    vc: {type: String, required: false},
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Approval', approvalSchema);