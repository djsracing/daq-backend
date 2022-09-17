const express = require('express');
const { generateInvitationCode } = require('./../controllers/admin.controller');

// Initializing router
const router = express.Router();

router.post('/generate/invitation-code', generateInvitationCode);

module.exports = router;