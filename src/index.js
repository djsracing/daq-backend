const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routers/auth.router');
const fs = require('fs');
const db = require('./configs/connection');
const dontenv = require('dotenv').config();

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT;

// Formatting incoming data and allowing cross origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging incoming requests
app.use(morgan('dev'));

// Initialize passport
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'daq'
}));
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/auth/microsoft', authRoutes);

// Test API
app.get('/api', (req, res) => {
	res.status(200).json({
    	name: `${process.env.API_NAME}`,
    	apiVersion: JSON.parse(fs.readFileSync('./package.json').toString()).version
  	});
});

// Listening on the port
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});