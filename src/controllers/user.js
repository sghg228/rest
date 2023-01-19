const userService = require('../services/user');
const Response = require("../utils/response");

class UserController {
    async list(req, res, next) {
        try {
            let page = null;
            if (req.query.page) {
                page = req.query.page;
            }
            res.json(await userService.list(page));
        } catch (err) {
            return next(err);
        }
    }

    async searchById(req, res, next) {
        try {
            let id = null;
            if (req.params.id) {
                id = req.params.id;
            }
            res.json(await userService.findById(id));
        } catch (err) {
            return next(err);
        }
    }

    async create(req, res, next) {
        const userData = req.body;
        try {
            let user = await userService.create(userData);
            res.json(user);
        } catch (err) {
            return next(err);
        }
    }

    async changePassword(req, res, next) {
        const id = req.params.id;
        const passwords = req.body;
        try {
            await userService.changePassword(id, passwords);
            res.json(new Response("Password was successfully changed", 200));
        } catch (err) {
            return next(err);
        }
    }

    async block(req, res, next) {
        const id = req.params.id;
        try {
            await userService.blockUser(id);
            res.json(new Response("User was successfully blocked", 200));
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new UserController();
