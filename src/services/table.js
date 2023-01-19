const tableRepository = require('../repository/table');

class TableService {
    async findAllBySchemeId(schemeId) {
        return await tableRepository.findAllBySchemeId(schemeId);
    }

    async findById(id) {
        return await tableRepository.findById(id);
    }
}

module.exports = new TableService();

