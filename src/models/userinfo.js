const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

/**
 * @swagger:
 * components:
 *   schemas:
 *      UserInfo:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of user info
 *          name:
 *            type: string
 *            description: The user's name
 *          birthday:
 *            type: string
 *            description: The user's birthday
 *          avatar:
 *            type: string
 *            description: The path to the user's avatar
 *          phone:
 *            type: string
 *            description: The user's phone
 *          email:
 *            type: string
 *            description: The user's email
 *          user_id:
 *            type: integer
 *            description: The user's id
 *        example:
 *          id: 1
 *          name: Den Tar
 *          birthday: 2022-01-06
 *          avatar: img/1/avatar.png
 *          phone: +375 29-111-11-11
 *          email: email@gmail.com
 *          user_id: 1
 */
const UserInfo = sequelize.define("user_info", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
    },
    birthday: {
        type: Sequelize.DATEONLY,
    },
    avatar: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
});

module.exports = UserInfo;

