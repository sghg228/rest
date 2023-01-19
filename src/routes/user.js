const express = require('express')
const userController = require('../controllers/user');
const validate = require("../middleware/validate");
const isAdmin = require("../middleware/isAdmin");
const UserScheme = require("../schemes/user");

const router = express.Router();

/**
 * @swagger:
 * tags:
 *   name: Users
 *   description: The users managing api
 */

/**
 * @swagger:
 * /users:
 *   get:
 *     summary: Returns list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/',isAdmin, userController.list);

/**
 * @swagger:
 * /users/{id}:
 *   get:
 *     summary: Get the user by it's id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the user id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id',isAdmin, userController.searchById);

/**
 * @swagger:
 * /users/passwords/{id}:
 *   patch:
 *     summary: Change password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: old password
 *               newPassword:
 *                 type: string
 *                 description: new password
 *             example:
 *               oldPassword: 12344321
 *               newPassword: 43211234
 *     responses:
 *       200:
 *         description: Password was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       403:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User with id not found
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
router.patch('/passwords/:id',validate(UserScheme.changePassword), userController.changePassword);

/**
 * @swagger:
 * /users/{id}:
 *   delete:
 *     summary: Block user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the user id
 *     responses:
 *       200:
 *         description: User was successfully blocked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         description: User with id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id',isAdmin, userController.block);

module.exports = router;

