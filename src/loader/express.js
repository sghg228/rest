const bodyParser = require('body-parser');
const session = require('express-session');

const express = require('express');
const router = express.Router();

router.use(bodyParser.json());
router.use(session({secret: 'kv'}));

module.exports = router;


