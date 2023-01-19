const userInfoRepository = require('../repository/userinfo');
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

class UserInfoService {
    async findById(id) {
        return await userInfoRepository.findById(id);
    }

    async findByEmail(email) {
        return await userInfoRepository.findByEmail(email);
    }

    async findByUserId(userId) {
        return await userInfoRepository.findByUserId(userId);
    }

    async create(userInfoData) {
        await this.checkUniqueFields(userInfoData);
        return await userInfoRepository.create(userInfoData);
    }

    async update(id, userInfoDate) {
        const userInfoExist = await userInfoRepository.findById(id);
        if (!userInfoExist) {
            throw new NotFoundError(`UserInfo with id: ${id} not found.`);
        }
        return await userInfoRepository.update(id, userInfoDate);
    }

    async checkUniqueFields(userInfoData) {
        let userInfo = await userInfoRepository.findByEmail(userInfoData.email);
        if (userInfo) {
            throw new ConflictError(`Email: ${userInfoData.email} already exist.`);
        }
        userInfo = await userInfoRepository.findByPhone(userInfoData.phone);
        if (userInfo) {
            throw new ConflictError(`Phone: ${userInfoData.phone} already exist.`);
        }
    }
}

module.exports = new UserInfoService();

