const Scheme = require('../models/scheme');
const Table = require('../models/table');
const tableRepository = require('../repository/table');
const sequelize = require("../database/sequelize");

class SchemeRepository {
    async findByRestaurantId(restaurantId) {
        return await Scheme.findOne({
            where: {restaurant_id: restaurantId}, include: [{
                model: Table, attributes: {exclude: ['scheme_id']}, required: false
            }]
        });
    }

    async findById(id) {
        return await Scheme.findByPk(id);
    }

    async create(schemeData) {
        return Scheme.create(schemeData, {
            include: [Table]
        });
    }

    async update(id, schemeData) {
        const t = await sequelize.transaction();
        try {
            await tableRepository.updateManyBySchemeId(id, schemeData.tables, t);
            const scheme = await Scheme.update(schemeData, {where: {id: id}, transaction: t});
            await t.commit();
            return scheme;
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }
}

module.exports = new SchemeRepository();

