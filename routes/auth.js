const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email, role });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.send({
                ok: false,
                message: 'Email or passwword is incorrect!'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.send({
            ok: true,
            message: 'Logged in successfully!'
        });
    } catch (err) {
        // console.error(err);
        return res.send({
            ok: false,
            message: 'Something went wrong please try again later!'
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;