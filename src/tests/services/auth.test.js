const authService = require("../../services/auth");
const userInfoService = require("../../services/userinfo");
const mailer = require("../../utils/mailer");
const userRepository = require("../../repository/user");
const constants = require("../../constants");
const ConflictError = require("../../errors/ConflictError");


describe("AuthService: signup", () => {
    const data = {
        user_info: {}
    };

    test("successfully sign up", async () => {
        userRepository.findByLogin = jest.fn().mockResolvedValue(null);
        userInfoService.findByEmail = jest.fn().mockResolvedValue(null);
        userRepository.create = jest.fn((data) => {
            data.id = 1;
            return data;
        });
        mailer.send = jest.fn();

        const result = await authService.signup(data);

        expect(result.id).not.toBeUndefined();
        expect(result.status).toEqual(constants.userActiveNum);
        expect(result.role).toEqual(constants.userRoleNum);
        expect(result.id).not.toBeUndefined();
        expect(userRepository.create).toBeCalledTimes(1);
        expect(mailer.send).toBeCalledTimes(1);
    })

    test("login is not unique", async () => {
        userRepository.findByLogin = jest.fn().mockResolvedValue({});
        try {
            await authService.signup(data);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictError);
        }
    })

    test("email is not unique", async () => {
        userRepository.findByLogin = jest.fn().mockResolvedValue(null);
        userInfoService.findByEmail = jest.fn().mockResolvedValue({});
        try {
            await authService.signup(data);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictError);
        }
    })
})
/*

describe("AuthService: login", () => {
    const id = 1;
    const data = {
        user_info: {}
    };
    const userId = 1;

    test("successfully login", async () => {
        const user = {};
        user.validatePassword = jest.fn().mockResolvedValue(true);
        userRepository.findByLogin = jest.fn().mockResolvedValue(user);

        userInfoService.findByEmail = jest.fn().mockResolvedValue(null);
        userRepository.create = jest.fn((data) => {
            data.id = 1;
            return data;
        });
        mailer.send = jest.fn();

        const result = await authService.signup(data);

        expect(result.id).not.toBeUndefined();
        expect(result.status).toEqual(constants.userActiveNum);
        expect(result.role).toEqual(constants.userRoleNum);
        expect(result.id).not.toBeUndefined();
        expect(userRepository.create).toBeCalledTimes(1);
        expect(mailer.send).toBeCalledTimes(1);
    })

    test("login is not unique", async () => {
        userRepository.findByLogin = jest.fn().mockResolvedValue({});
        try {
            await authService.signup(data);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictError);
        }
    })

    test("email is not unique", async () => {
        userRepository.findByLogin = jest.fn().mockResolvedValue(null);
        userInfoService.findByEmail = jest.fn().mockResolvedValue({});
        try {
            await authService.signup(data);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictError);
        }
    })
})*/


