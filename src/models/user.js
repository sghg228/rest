const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

/**
 * @swagger:
 * components:
 *   schemas:
 *      User:
 *        type: object
 *        required:
 *          - login
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of user
 *          login:
 *            type: string
 *            description: The user login
 *          password:
 *            type: string
 *            description: The user password
 *          role:
 *            type: smallint
 *            description: The user role
 *          status:
 *            type: smallint
 *            description: The user role
 *        example:
 *          login: fenix23707
 *          password: 12345678
 */
const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        min: 0,
        max: 2
    },
    status: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        min: 0,
        max: 1
    }
});

User.beforeCreate((user, opts) => {
    user.password = User.hashPassword(user.password);
})

User.beforeBulkUpdate((user, opts) => {
    if (user.attributes.password) {
        user.attributes.password = User.hashPassword(user.attributes.password);
    }
})

User.hashPassword = password => {
    return bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(8));
}

User.prototype.validatePassword = function (password) {
    if (!password || !this.password) {
        return false;
    }
    return bcrypt.compareSync(password.toString(), this.password.toString());
}

module.exports = User;

/**
 * @swagger:
 * components:
 *   schemas:
 *      SignUp:
 *        type: object
 *        required:
 *          - login
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of user
 *          login:
 *            type: string
 *            description: The user login
 *          password:
 *            type: string
 *            description: The user password
 *          role:
 *            type: smallint
 *            description: The user role
 *          status:
 *            type: smallint
 *            description: The user role
 *          user_info:
 *            type: object
 *            description: The user info
 *            properties:
 *              email:
 *                type: string
 *                description: The user email
 *
 *        example:
 *          login: den23707
 *          password: qwerty
 *          user_info:
 *            email: den23707@gmail.com
 */