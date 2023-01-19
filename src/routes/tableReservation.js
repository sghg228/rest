const express = require('express')
const tableReservationController = require('../controllers/tableReservation');
const validate = require("../middleware/validate");
const TableReservationScheme = require("../schemes/tableReservation");

const router = express.Router();

/**
 * @swagger:
 * tags:
 *   name: Reservation
 *   description: The reservations managing api
 */

/**
 * @swagger:
 * /reservations/users/{id}:
 *   get:
 *     summary: Get list of reservations by user id
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the user id
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
 *                 $ref: '#/components/schemas/TableReservation'
 */
router.get('/users/:id', tableReservationController.findAllByUserId);

/**
 * @swagger:
 * /reservations/restaurants/{id}:
 *   get:
 *     summary: Get list of reservations by restaurant id
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the restaurant id
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
 *                 $ref: '#/components/schemas/TableReservation'
 */
router.get('/restaurants/:id', tableReservationController.findAllByRestaurantId);

/**
 * @swagger:
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TableReservation'
 *     responses:
 *       201:
 *         description: The reservation was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TableReservation'
 *       404:
 *         description: Table with id ... not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Table with id = 1 from Sat Feb 08 2020 06:30:00 GMT+0300 (Moscow Standard Time) to Sat Feb 08 2020 07:30:00 GMT+0300 (Moscow Standard Time) is taken
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
router.post('/', validate(TableReservationScheme.create), tableReservationController.create);

/**
 * @swagger:
 * /reservations/status/{id}:
 *   patch:
 *     summary: Change status of the reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the reservation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: integer
 *                 description: New status of reservation. (COMPLETED - 1, CANCELLED - 2)
 *             example:
 *               status: 1
 *     responses:
 *       201:
 *         description: The status was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       403:
 *         description: Status can't be changed, current status = 1
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Reservation with id ... not found
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
router.patch('/status/:id', validate(TableReservationScheme.changeStatus), tableReservationController.changeStatus);

module.exports = router;

