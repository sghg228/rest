const Express = require("./express");
const Passport = require("./passport");
const Routing = require("./routing");

const express = require('express');
const router = express.Router();

router.use(Express);
router.use(Passport);
router.use(Routing);

module.exports = router;
