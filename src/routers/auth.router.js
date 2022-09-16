const express = require('express');
const passport = require('passport');
const passportSetup = require('./../configs/microsoft-oauth');  
const {
    microsoftCallback,
    microsoftFailure
} = require('./../controllers/auth.controller');

// Initializing router
const router = express.Router();

router.get('/', passport.authenticate('microsoft'));

router.get('/callback', passport.authenticate('microsoft', { failureRedirect: '/auth/microsoft/fail' }), microsoftCallback);

router.get('/fail', microsoftFailure);

module.exports = router;