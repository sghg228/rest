const userRepository = require('../repository/user');
const constants = require('../constants')
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

class UserService {
    async list(page) {
        return await userRepository.list(page);
    }

    async findById(id) {
        return await userRepository.findById(id);
    }

    async create(userData) {
        let userExist = await userRepository.findByLogin(userData.login);
        if (userExist) {
            throw new ConflictError(`Login: ${userData.login} already exist`);
        }
        return await userRepository.create(userData);
    }

    async changePassword(id, passwords) {
        await this.checkUserExist(id);
        await this.checkPasswordCorrect(id, passwords.oldPassword);
        const dataToUpdate = {password: passwords.newPassword};
        return await userRepository.update(id, dataToUpdate);
    }

    async blockUser(id) {
        await this.checkUserExist(id);
        const dataToUpdate = {
            status: constants.userNotActiveNum,
        }
        return await userRepository.update(id, dataToUpdate);
    }

    async checkPasswordCorrect(id, password) {
        const user = await userRepository.findById(id);
        if (!user.validatePassword(password)) {
            throw new ForbiddenError(`Incorrect password`);
        }
    }

    async checkUserExist(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new NotFoundError(`User with id = ${id} not found`);
        }
    }

    async changeRole(id, role) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new NotFoundError(`User with id: ${id} not found.`);
        }
        if (user.role === constants.userRoleNum) {
            const userData = {role: role};
            await userRepository.update(id, userData);
        }
    }
}

module.exports = new UserService();

