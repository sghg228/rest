const UserInfo = require('../models/userinfo');

class UserInfoRepository {
    async findById(id) {
        return await UserInfo.findByPk(id);
    }

    async findByUserId(userId) {
        return await UserInfo.findOne({where: {user_id: userId}});
    }

    async findByEmail(email) {
        return await UserInfo.findOne({where: {email: email}});
    }

    async findByPhone(phone) {
        return await UserInfo.findOne({where: {phone: phone}});
    }

    async create(userInfoData) {
        return await UserInfo.create(userData);
    }

    async update(id, userInfoData) {
        return await UserInfo.update(userInfoData, {where: {id: id}});
    }
}

module.exports = new UserInfoRepository();

