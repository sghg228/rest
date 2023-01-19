const express = require('express')
const tableController = require('../controllers/table');

const router = express.Router();

/**
 * @swagger:
 * tags:
 *   name: Table
 *   description: The tables managing api
 */

/**
 * @swagger:
 * /tables/schemes/{id}:
 *   get:
 *     summary: Get list of tables by scheme id
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the scheme id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 */
router.get('/schemes/:id', tableController.findAllBySchemeId);

/**
 * @swagger:
 * /tables/{id}:
 *   get:
 *     summary: Get tables by id
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         scheme:
 *           type: integer
 *         required: true
 *         description: the table id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 */
router.get('/:id', tableController.findById);


module.exports = router;

