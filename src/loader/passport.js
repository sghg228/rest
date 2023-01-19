const passport = require("passport");
require("../passport")(passport);

const express = require("express");
const router = express.Router();

router.use(passport.initialize());

module.exports = router;
