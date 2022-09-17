const express = require('express');
const passport = require('passport');
const passportSetup = require('./../configs/microsoft-oauth');  
const {
    microsoftCallback,
    microsoftFailure,
    verifyInvitationCode
} = require('./../controllers/auth.controller');

// Initializing router
const router = express.Router();

router.get('/microsoft', passport.authenticate('microsoft'));

router.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/auth/microsoft/fail' }), microsoftCallback);

router.get('/microsoft/fail', microsoftFailure);

router.post('/verify/invitation-code', verifyInvitationCode);

module.exports = router;