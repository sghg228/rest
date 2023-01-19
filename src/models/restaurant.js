const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

/**
 * @swagger:
 * components:
 *   schemas:
 *      Restaurant:
 *        type: object
 *        required:
 *          - name
 *          - adres
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of restaurant
 *          name:
 *            type: string
 *            description: The name of restaurant. Should be unique.
 *          adres:
 *            type: string
 *            description: The adres of restaurant.
 *          avatar:
 *            type: string
 *            description: The avatar of restaurant.
 *          status:
 *            type: integer
 *            description: Status of restaurant. (Active - 0, Not active - 1)
 *          user_id:
 *            type: integer
 *            description: The id of restaurant owner.
 *        example:
 *          name: ResTop
 *          adres: Belarus, Vitebsk, Moskovskiy Prospekt, 33
 */
const Restaurant = sequelize.define("restaurant", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    adres: {
        type: Sequelize.STRING,
    },
    avatar: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.SMALLINT,
        min: 0,
        max: 1,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Restaurant;


/**
 * @swagger:
 * components:
 *   schemas:
 *      RestaurantScheme:
 *        type: object
 *        required:
 *          - name
 *          - adres
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of restaurant
 *          name:
 *            type: string
 *            description: The name of restaurant. Should be unique.
 *          adres:
 *            type: string
 *            description: The adres of restaurant.
 *          avatar:
 *            type: string
 *            description: The avatar of restaurant.
 *          status:
 *            type: integer
 *            description: Status of restaurant. (Active - 0, Not active - 1)
 *          user_id:
 *            type: integer
 *            description: The id of restaurant owner.
 *          scheme:
 *            $ref: '#/components/schemas/Scheme'
 *        example:
 *          name: ResTop
 *          adres: Belarus, Vitebsk, Moskovskiy Prospekt, 33
 *          scheme:
 *            width: 200
 *            height: 200
 *
 */

/**
 * @swagger:
 * components:
 *   schemas:
 *      RestaurantSchemeTables:
 *        type: object
 *        required:
 *          - name
 *          - adres
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of restaurant
 *          name:
 *            type: string
 *            description: The name of restaurant. Should be unique.
 *          adres:
 *            type: string
 *            description: The adres of restaurant.
 *          avatar:
 *            type: string
 *            description: The avatar of restaurant.
 *          status:
 *            type: integer
 *            description: Status of restaurant. (Active - 0, Not active - 1)
 *          user_id:
 *            type: integer
 *            description: The id of restaurant owner.
 *          scheme:
 *            $ref: '#/components/schemas/SchemeTables'
 *        example:
 *          name: ResTop
 *          adres: Belarus, Vitebsk, Moskovskiy Prospekt, 33
 *          scheme:
 *            width: 200
 *            height: 200
 *            tables:
 *            - capacity: 2
 *              width: 15
 *              height: 15
 *              x: 10
 *              y: 10
 *
 */