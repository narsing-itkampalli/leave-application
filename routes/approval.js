const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Approval = require('../models/Approval');
const User = require('../models/User');

router.get('/:id', (req, res) => {
    if (!req.user || req.user.role !== 'higherAuthority') return res.redirect('/');
    Application.findById(req.params.id)
        .populate('user')
        .then(application => {
            console.log(application);
            res.render('approval-form', { application })
        })
        .catch(() => res.redirect('/'));
});

router.post('/:id', async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.sanctioned ? 'approved' : 'rejected' },
            { new: true }
        );

        await new Approval({
            application: application._id,
            approvedBy: req.user._id,
            ...req.body
        }).save();

        if (req.body.sanctioned == '1') {
            await User.findByIdAndUpdate(
                application.user,
                { $inc: { pendingLeaves: -1 } }
            );
        }

        res.send({
            ok: true,
            message: 'Reviewed leave application successfully!'
        });
    } catch (err) {
        console.error(err);
        return res.send({
            ok: false,
            message: 'Something went wrong please try again later!'
        });
    }
});

module.exports = router;