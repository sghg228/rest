const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

/**
 * @swagger:
 * components:
 *   schemas:
 *      Review:
 *        type: object
 *        required:
 *          - rate
 *          - restaurant_id
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of review
 *          rate:
 *            type: integer
 *            description: The rate of a particular restaurant. Must be between 1 and 10.
 *          review:
 *            type: string
 *            description: Text of review.
 *          date:
 *            type: string
 *            description: Time of create.
 *          user_id:
 *            type: integer
 *            description: ID of the user that leave that review
 *          restaurant_id:
 *            type: integer
 *            description: ID of the restaurant that the review belongs to
 *        example:
 *          rate: 10
 *          review: Good
 *          restaurant_id: 1
 */
const Review = sequelize.define("review", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    rate: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        min: 1,
        max: 10,
    },
    review: {
        type: Sequelize.TEXT,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Review;

