const express = require('express');
const router = express.Router();

const errorHandler = require("../middleware/errorHandler");
const errorConsoleLogger = require("../middleware/errorConsoleLogger");
const errorMongoLogger = require("../middleware/errorMongoLogger");
const isAuthorized = require("../middleware/isAuthorized");
const eventLogger = require("../middleware/eventLogger");

const signupRouter = require("../routes/signup");
const loginRouter = require("../routes/login");
const usersRouter = require("../routes/user");
const userInfoRouter = require("../routes/userinfo");
const restaurantRouter = require("../routes/restaurant");
const reservationRouter = require("../routes/tableReservation");
const schemeRouter = require("../routes/scheme");
const tableRouter = require("../routes/table");
const reviewRouter = require("../routes/review");

router.use(eventLogger);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use( isAuthorized);
router.use('/users', usersRouter);
router.use('/userinfo', userInfoRouter);
router.use('/restaurants', restaurantRouter);
router.use('/reservations', reservationRouter);
router.use('/schemes', schemeRouter);
router.use('/tables', tableRouter);
router.use('/reviews', reviewRouter);

router.use(errorConsoleLogger);
router.use(errorMongoLogger);
router.use(errorHandler);

module.exports = router;
