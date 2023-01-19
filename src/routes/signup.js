const express = require('express')
const authController = require('../controllers/auth');
const validate = require("../middleware/validate");
const UserScheme = require("../schemes/user");

const router = express.Router();

/**
 * @swagger:
 * tags:
 *   name: SignUp
 *   description: The signup managing api
 */

/**
 * @swagger:
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [SignUp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               login:
 *                 type: string
 *                 description: User login. Must be unique
 *               password:
 *                 type: string
 *                 description: Password must be min 4 symbols
 *               user_info:
 *                 type: object
 *                 description: The user info
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: The user email
 *             example:
 *               login: fenix23707
 *               password: qwerty
 *               user_info:
 *                 email: fenix23707@gmail.com
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: The login already exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: body is not valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validate(UserScheme.signup), authController.signup);

module.exports = router;

