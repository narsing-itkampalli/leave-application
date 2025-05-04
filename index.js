const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');
const approvalRoutes = require('./routes/approval');
const Application = require('./models/Application');

const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/auth', authRoutes);
app.use('/', applicationRoutes);
app.use('/approval', approvalRoutes);

app.get('/', (req, res) => {
    if (!req.user) return res.render('login');

    Application.find(req.user.role === 'staff' ? { user: req.user._id } : {})
        .sort({ createdAt: -1 })
        .populate('user')
        .then(applications => res.render('applications', { applications, user: req.user }))
        .catch(() => res.render('applications', { applications: [] }));
});

app.use("/", express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));