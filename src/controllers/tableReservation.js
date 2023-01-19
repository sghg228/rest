const tableReservationService = require('../services/tableReservation');
const Response = require("../utils/response");
const constants = require("../constants");

class TableReservationController {
    async findAllByUserId(req, res, next) {
        const userId = req.params.id;

        const sort = [];
        if (req.query.sortBy) {
            sort.push([
                req.query.sortBy,
                req.query.order === 'desc' ? 'DESC' : 'ASC'
            ]);
        }

        const pagination = {};
        let pageSize = constants.pageSize;
        if (req.query.pageSize) {
            pageSize = parseInt(req.query.pageSize, 10);
        }
        if (req.query.pageNum) {
            pagination.offset = pageSize * (parseInt(req.query.pageNum, 10) - 1);
            pagination.limit = pageSize;
        }

        try {
            res.json(await tableReservationService.findAllByUserId(userId, sort, pagination));
        } catch (err) {
            return next(err);
        }
    }

    async findAllByRestaurantId(req, res, next) {
        const restaurantId = req.params.id;

        const sort = [];
        if (req.query.sortBy) {
            sort.push([
                req.query.sortBy,
                req.query.order === 'desc' ? 'DESC' : 'ASC'
            ]);
        }

        const pagination = {};
        let pageSize = constants.pageSize;
        if (req.query.pageSize) {
            pageSize = parseInt(req.query.pageSize, 10);
        }
        if (req.query.pageNum) {
            pagination.offset = pageSize * (parseInt(req.query.pageNum, 10) - 1);
            pagination.limit = pageSize;
        }

        try {
            res.json(await tableReservationService.findAllByRestaurantId(restaurantId, sort, pagination));
        } catch (err) {
            return next(err);
        }
    }

    async create(req, res, next) {
        try {
            const tableReservationBody = req.body;
            tableReservationBody.user_id =  req.session.user.id; // TODO: delete default id and add req.session.user.id
            const reservation = await tableReservationService.create(tableReservationBody);
            res.status(201).json(reservation);
        } catch (err) {
            return next(err);
        }
    }

    async changeStatus(req, res, next) {
        const id = req.params.id;
        const status = req.body;
        try {
            await tableReservationService.changeStatus(id, status);
            res.json(new Response("Status successfully changed", 200))
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TableReservationController();

