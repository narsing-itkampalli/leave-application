import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Connect DB
await connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", dashboardRoutes);

// Static files
app.use("/", express.static("public"));

app.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
});
