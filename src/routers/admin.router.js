const express = require('express');
const auth = require('./../middlewares/authentication.middleware');
const { generateInvitationCode } = require('./../controllers/admin.controller');

// Initializing router
const router = express.Router();

router.post('/generate/invitation-code', [auth.verifyJwt, auth.accountActivatedTrue], generateInvitationCode);

module.exports = router;