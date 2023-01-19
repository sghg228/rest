const userInfoService = require("../services/userinfo");
const Response = require("../utils/response");

class UserInfoController {
    async searchById(req, res, next) {
        const id = req.params.id;
        try {
            res.json(await userInfoService.findById(id));
        } catch (err) {
            return next(err);
        }
    }

    async searchByUserId(req, res, next) {
        let userId = req.params.id;
        if (!userId) {
            userId = req.session.user.id;
        }
        try {
            res.json(await userInfoService.findByUserId(userId))
        } catch (err) {
            return next(err);
        }
    }

    async update(req, res, next) {
        const id = req.params.id;
        const userInfoData = req.body;
        try {
            await userInfoService.update(id, userInfoData)
            res.json(res.json(new Response("Update successful", 200)));
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new UserInfoController();
