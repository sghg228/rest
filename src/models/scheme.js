const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

/**
 * @swagger:
 * components:
 *   schemas:
 *      Scheme:
 *        type: object
 *        required:
 *          - width
 *          - height
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of scheme
 *          width:
 *            type: integer
 *            description: The width of scheme in meters. Must be between 10 and 10_000
 *          height:
 *            type: integer
 *            description: The height of scheme in meters. Must be between 10 and 10_000
 *          restaurant_id:
 *            type: integer
 *            description: The id of restaurant that the scheme belongs to.
 *        example:
 *          width: 200
 *          height: 200
 *          restaurant_id: 2
 */
const Scheme = sequelize.define("scheme", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    width: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 10,
        max: 10000
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 10,
        max: 10000
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Scheme;


/**
 * @swagger:
 * components:
 *   schemas:
 *      SchemeTables:
 *        type: object
 *        required:
 *          - width
 *          - height
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of scheme
 *          width:
 *            type: integer
 *            description: The width of scheme in meters. Must be between 10 and 10_000
 *          height:
 *            type: integer
 *            description: The height of scheme in meters. Must be between 10 and 10_000
 *          restaurant_id:
 *            type: integer
 *            description: The id of restaurant that the scheme belongs to.
 *          scheme:
 *            $ref: '#/components/schemas/Table'
 *        example:
 *          width: 200
 *          height: 200
 *          restaurant_id: 2
 *          tables:
 *            - capacity: 2
 *              width: 15
 *              height: 15
 *              x: 10
 *              y: 10
 *
 *
 */
 
 