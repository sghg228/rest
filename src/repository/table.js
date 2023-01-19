const Table = require('../models/table');

class TableRepository {
    async findAllBySchemeId(schemeId) {
        return await Table.findAll({where: {scheme_id: schemeId}});
    }

    async findById(id) {
        return await Table.findByPk(id);
    }

    async createMany(tablesData, transaction) {
        return await Table.bulkCreate(tablesData, {
            transaction: transaction
        });
    }

    async updateManyBySchemeId(schemeId,tables, transaction) {
        await this.deleteBySchemeId(schemeId, transaction);
        for (let table of tables) {
            table.scheme_id = schemeId;
        }
        return await this.createMany(tables, transaction);
    }

    async deleteBySchemeId(schemeId, transaction) {
        return await Table.destroy({
            where: {scheme_id: schemeId},
            transaction: transaction
        });
    }
}

module.exports = new TableRepository();

