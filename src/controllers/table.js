const tableService = require('../services/table');

class TableController {
    async findAllBySchemeId(req, res, next) {
        const schemeId = req.params.id;
        try {
            res.json(await tableService.findAllBySchemeId(schemeId));
        } catch (err) {
            return next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            res.json(await tableService.findById(id));
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new TableController();
