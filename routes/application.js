const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const User = require('../models/User');

router.get('/apply', (req, res) => {
    if (!req.user || req.user.role !== 'staff') return res.redirect('/');
    res.render('application-form');
});

router.post('/apply', async (req, res) => {
    try {
        const application = new Application({
            user: req.user._id,
            ...req.body
        });

        await application.save();
        await User.findByIdAndUpdate(req.user._id, { $inc: { pendingLeaves: 1 } });
        res.send({
            ok: true,
            message: 'Create application successfully'
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