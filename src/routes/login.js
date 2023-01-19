const express = require('express')
const authController = require('../controllers/auth');
const validate = require("../middleware/validate");
const UserScheme = require("../schemes/user");

const router = express.Router();

/**
 * @swagger:
 * tags:
 *   name: Login
 *   description: The login managing api
 */

/**
 * @swagger:
 * /login:
 *   post:
 *     summary: Create a new user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -  login
 *               -  password
 *             properties:
 *               login:
 *                 type: string
 *                 description: User's login
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               login: fenix23707
 *               password: qwerty
 *     responses:
 *       201:
 *         description: Authorization successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */
router.post('/',validate(UserScheme.login),  authController.login);

module.exports = router;

