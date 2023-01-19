const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

/**
 * @swagger:
 * components:
 *   schemas:
 *      Table:
 *        type: object
 *        required:
 *          - capacity
 *          - width
 *          - height
 *          - x
 *          - y
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of table
 *          capacity:
 *            type: integer
 *            description: Capacity of the table. Must be between 1 and 5_000
 *          width:
 *            type: integer
 *            description: The width of table in decimeter. Must be between 10 and 1_000
 *          height:
 *            type: integer
 *            description: The height of table in decimeter. Must be between 10 and 1_000
 *          x:
 *            type: integer
 *            description: Horizontal position of the table in meters. Count from left top corner. Must be between 0 and 10_000
 *          y:
 *            type: integer
 *            description: Vertical position of the table in meters. Count from left top corner. Must be between 0 and 10_000
 *          scheme_id:
 *            type: integer
 *            description: The id of scheme that the table belongs to.
 *        example:
 *          capacity: 2
 *          width: 15
 *          height: 15
 *          x: 10
 *          y: 10
 *          scheme_id: 2
 */
const Table = sequelize.define("table", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 1,
        max: 5000
    },
    width: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 10,
        max: 1000
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 10,
        max: 1000
    },
    x: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        min: 0,
        max: 10000
    },
    y: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 0,
        max: 10000
    },
    scheme_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Table;

