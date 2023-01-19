const userRepository = require('../repository/user');
const userInfoService = require('../services/userinfo');
const mailer = require('../utils/mailer');
const constants = require('../constants')
const ConflictError = require("../errors/ConflictError");
const ForbiddenError = require("../errors/ForbiddenError");

class AuthService {
    async findActiveUserById(id) {
        const user = await userRepository.findById(id);
        this.checkUserIsActive(user);
        return user;
    }

    async signup(userData) {
        const email = userData.user_info.email;
        await this.checkLoginUnique(userData.login);
        await this.checkEmailUnique(email);

        userData.role = constants.userRoleNum;
        userData.status = constants.userActiveNum;

        const user = await userRepository.create(userData);

        // await mailer.send(email, 'sign up', 'Account successfully created.');
        return AuthService.#createUser(user);
    }

    async login(login, password) {
        const user = await userRepository.findByLogin(login);
        if (!user || !user.validatePassword(password)) {
            throw new ForbiddenError("Invalid login or password");
        }

        this.checkUserIsActive(user);
        return AuthService.#createUser(user);
    }

    checkUserIsActive(user) {
        if (user.status === constants.userNotActiveNum) {
            return new ForbiddenError("User is not active");
        }
    }

    async checkLoginUnique(login) {
        const userExist = await userRepository.findByLogin(login);
        if (userExist) {
            throw new ConflictError(`User with login = ${login} already exist`);
        }
    }

    async checkEmailUnique(email) {
        const userInfo = await userInfoService.findByEmail(email);
        if (userInfo) {
            throw new ConflictError(`Email = ${email} already exist`);
        }
    }

    static #createUser(user) {
        return {
            id: user.id,
            login: user.login,
            role: user.role,
        }
    }
}

module.exports = new AuthService();


