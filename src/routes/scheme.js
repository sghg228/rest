const express = require('express')
const schemeController = require('../controllers/scheme');
const validate = require("../middleware/validate");
const SchemeScheme = require("../schemes/scheme");

const router = express.Router();

/**
 * @swagger:
 * tags:
 *   name: Scheme
 *   description: The schemes managing api
 */

/**
 * @swagger:
 * /schemes/{id}:
 *   get:
 *     summary: Get scheme by id
 *     tags: [Scheme]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Scheme'
 */
router.get('/:id', schemeController.findById);

/**
 * @swagger:
 * /schemes/restaurants/{id}:
 *   get:
 *     summary: Get scheme by restaurant id
 *     tags: [Scheme]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the restaurant id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchemeTables'
 */
router.get('/restaurants/:id', schemeController.findByRestaurantId);

/**
 * @swagger:
 * /schemes/restaurants/count/{id}:
 *   get:
 *     summary: Get number of free tables by restaurant id
 *     tags: [Scheme]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the restaurant id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               parameters:
 *                 restaurantId:
 *                   type: integer
 *                   description: restaurant id
 *                 count:
 *                   type: integer
 *                   description: number of free table right now in specific restaurant
 *               example:
 *                restaurantId: 1
 *                count: 3
 */
router.get('/restaurants/count/:id', schemeController.getCountFreeTables);

/**
 * @swagger:
 * /schemes/{id}:
 *   put:
 *     summary: Update scheme by id
 *     tags: [Scheme]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the scheme id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchemeTables'
 *     responses:
 *       200:
 *         description: Scheme was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       403:
 *         description: User with id = ... doesn't have access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Scheme with id = ... not found
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
router.put('/:id',validate(SchemeScheme.update), schemeController.update);

module.exports = router;


