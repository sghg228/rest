const express = require('express')
const restaurantController = require('../controllers/restaurant');
const validate = require("../middleware/validate");
const RestaurantScheme = require("../schemes/restaurant");

const router = express.Router();


/**
 * @swagger:
 * tags:
 *   name: Restaurant
 *   description: The restaurants managing api
 */

/**
 * @swagger:
 * /restaurants:
 *   get:
 *     summary: Get list of active restaurants
 *     tags: [Restaurant]
 *     parameters:
 *       - in: query
 *         name: name
 *         scheme:
 *           type: string
 *         description: The name of restaurant
 *       - in: query
 *         name: adres
 *         scheme:
 *           type: string
 *         description: The adres of restaurant
 *       - in: query
 *         name: sortBy
 *         scheme:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: order
 *         scheme:
 *           type: string
 *         description: Order of sort. ASC or DESC
 *       - in: query
 *         name: pageNum
 *         scheme:
 *           type: integer
 *         description: Page number. Start from 1
 *       - in: query
 *         name: pageSize
 *         scheme:
 *           type: integer
 *         description: How many records on page
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/', restaurantController.search);

/**
 * @swagger:
 * /restaurants/users/{id}:
 *   get:
 *     summary: Get restaurants by user id
 *     tags: [Restaurant]
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/users/:id', restaurantController.searchByUserId);

/**
 * @swagger:
 * /restaurants/{id}:
 *   get:
 *     summary: Get restaurant by it's id
 *     tags: [Restaurant]
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
 *               $ref: '#/components/schemas/Restaurant'
 */
router.get('/:id', restaurantController.searchById);

/**
 * @swagger:
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantSchemeTables'
 *     responses:
 *       201:
 *         description: The restaurant was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: User with id ... not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Restaurant with name ... already exist
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
router.post('/', validate(RestaurantScheme.create), restaurantController.create);

/**
 * @swagger:
 * /restaurants/{id}:
 *   put:
 *     summary: Update the restaurant
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the restaurant id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: The restaurant was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       403:
 *         description: The user is trying to change the wrong restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User with id ... not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Restaurant with name ... already exist
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
router.put('/:id', validate(RestaurantScheme.update), restaurantController.update);

/**
 * @swagger:
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete restaurant by id. If restaurant has reservations, then it's status change on not active, otherwise delete
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the restaurant id
 *     responses:
 *       200:
 *         description: The restaurant was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       403:
 *         description: The user is trying to delete the wrong restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Restaurant with id ... not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', restaurantController.delete);

module.exports = router;

