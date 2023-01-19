const express = require('express')
const reviewController = require('../controllers/review');
const validate = require("../middleware/validate");
const ReviewScheme = require("../schemes/review");

const router = express.Router();

/**
 * @swagger:
 * tags:
 *   name: Review
 *   description: The reviews managing api
 */

/**
 * @swagger:
 * /reviews/restaurants/{id}:
 *   get:
 *     summary: Get list of reviews by restaurant id
 *     tags: [Review]
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/restaurants/:id', reviewController.findAllByRestaurantId);

/**
 * @swagger:
 * tags:
 *   name: Review
 *   description: The reviews managing api
 */

/**
 * @swagger:
 * /reviews/restaurants/rating/{id}:
 *   get:
 *     summary: Get rating by restaurant id
 *     tags: [Review]
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
 *               properties:
 *                 restaurantId:
 *                   type: integer
 *                   description: id of restaurant.
 *                 rating:
 *                   type: float
 *                   description: rating of restaurant.
 *               example:
 *                 restaurantId: 1
 *                 rating: 8.2
 *
 */
router.get('/restaurants/rating/:id', reviewController.findRatingByRestaurantId);

/**
 * @swagger:
 * /reviews/users/{userId}/restaurants/{restaurantId}:
 *   get:
 *     summary: Get review by user id and restaurant id
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: userId
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the user id
 *       - in: path
 *         name: restaurantId
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
 *               $ref: '#/components/schemas/Review'
 */
router.get('/users/:userId/restaurants/:restaurantId', reviewController.findByUserIdAndRestaurantId);

/**
 * @swagger:
 * /reviews/{id}:
 *   get:
 *     summary: Get review by id
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the review id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.get('/:id', reviewController.findById);

/**
 * @swagger:
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Restaurant with id ... not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Review for restaurant with id = 1 from user with id = 2 already exist
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
router.post('/', validate(ReviewScheme.create), reviewController.create);

/**
 * @swagger:
 * /reviews/{id}:
 *   put:
 *     summary: Update text or rate of review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rate:
 *                 type: integer
 *                 description: The rate of a particular restaurant. Must be between 1 and 10.
 *               review:
 *                 type: string
 *                 description: Text of review.
 *             example:
 *               rate: 10
 *               review: Good
 *     responses:
 *       201:
 *         description: The review was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Restaurant with id ... not found
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
router.put('/:id', validate(ReviewScheme.update), reviewController.update);

module.exports = router;


