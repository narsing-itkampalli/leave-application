import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send("Invalid email or password");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.send("Invalid email or password");

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    req.session.token = token;

    res.redirect("/");
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

export default router;
