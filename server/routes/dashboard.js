import express from "express";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, (req, res) => {
    res.send(`Welcome ${req.user.email}! <a href="/logout">Logout</a>`);
});

export default router;