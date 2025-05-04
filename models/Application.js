const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String, required: true},
    department: {type: String, required: false},
    designation: {type: String, required: false},
    joinedOn: {type: Date, required: false},
    mobile: {type: String, required: true},
    employeeCode: {type: String, required: false},

    leaveType: {type: String, required: true},
    numberOfDays: {type: Number, required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    prefix: { type: String, required: false },
    suffix: { type: String, required: false },
    reason: { type: String, required: true },
    address: {type: String, required: true},
    applicationDate: {type: Date, required: true},
    applicantSignature: {type: String, required: false},
    signatureDate: {type: Date, required: false},

    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);