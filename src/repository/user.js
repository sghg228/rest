const User = require('../models/user');
const UserInfo = require('../models/userinfo');
const constants = require('../constants');
const ConflictError = require("../errors/ConflictError");

class UserRepository {
    findById(id) {
        return User.findByPk(id);
    }

    findByLogin(login) {
        return User.findOne({where: {login: login}});
    }

    async list(page) {
        let result = null;
        const userOnPage = constants.usersOnPage;
        if (page) {
            result = await User.findAll({offset: userOnPage * (page - 1), limit: userOnPage});
        } else {
            result = await User.findAll();
        }
        return result;
    }

    async create(userData) {
        const user = await User.create(userData, {
            include: UserInfo
        });
        return user;
    }

    async update(id, userData) {
        return await User.update(userData, {where: {id: id}});
    }
}

module.exports = new UserRepository();

