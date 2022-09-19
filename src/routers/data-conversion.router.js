const express = require('express');
const auth = require('./../middlewares/authentication.middleware');
const upload = require('./../configs/multer');

const {
    convertCsvToJson
} = require('./../controllers/data-conversion.controller');

// Initializing router
const router = express.Router();

router.post('/csvtojson', [auth.verifyJwt, auth.accountActivatedTrue], upload.single('file'), convertCsvToJson);

module.exports = router;