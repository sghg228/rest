const TableReservation = require('../models/tableReservation');
const Scheme = require('../models/scheme');
const Restaurant = require('../models/restaurant');
const constants = require("../constants");
const sequelize = require("sequelize");
const Table = require("../models/table");
const Op = sequelize.Op;

class TableReservationRepository {
    async findAllByUserId(userId, sort, pagination) {
        return await TableReservation.findAll({
            include: [{
                model: Table,
                required: true,
                attributes: ["scheme_id"],
                include: [{
                    model: Scheme,
                    attributes: ["restaurant_id"],
                    required: true,
                    include: [{
                        model: Restaurant,
                        attributes: ["name"],
                        required: true,
                    }]
                }]
            }],
            where: {user_id: userId},
            order: sort,
            offset: pagination.offset,
            limit: pagination.limit,
        });
    }

    async findAllByRestaurantId(restaurantId, sort, pagination) {
        return await TableReservation.findAll({
            include: [{
                model: Table,
                required: true,
                attributes: ["scheme_id"],
                include: [{
                    model: Scheme,
                    attributes: ["restaurant_id"],
                    required: true,
                    where: {restaurant_id: restaurantId},
                }]
            }],
            order: sort,
            offset: pagination.offset,
            limit: pagination.limit,
        });
    }

    async findAllByTableId(tableId) {
        return await TableReservation.findAll({where: {table_id: tableId}});
    }

    async findAllBookedByTableIdAndReservationTime(tableId, startTime, endTime) {
        return await TableReservation.findOne({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            {datetime_begin: {[Op.between]: [startTime, endTime]}},
                            {datetime_end: {[Op.between]: [startTime, endTime]}},
                        ]
                    },
                    {table_id: tableId},
                    {status: constants.bookedReservationStatusNum}
                ]
            }
        });
    }

    async findById(id) {
        return await TableReservation.findByPk(id);
    }

    async create(reservationData) {
        return await TableReservation.create(reservationData);
    }

    async update(id, reservationData) {
        return await TableReservation.update(reservationData, {where: {id: id}});
    }

    async countTableReservations(tableId, time) {
        const where = {
            [Op.and]: [
                {table_id: tableId},
                {datetime_begin: {[Op.lte]: time}},
                {datetime_end: {[Op.gte]: time}},
            ]
        }
        return await TableReservation.count({where: where});
    }


    async countReservedTableBySchemeId(schemeId, time) {
        return await TableReservation.count({
            include: [{
                model: Table,
                required: true,
                attributes: ["scheme_id"],
                where: {
                    scheme_id: schemeId
                }
            }],
            where: {
                [Op.and]: [
                    // {scheme_id: schemeId},
                    {datetime_begin: {[Op.lte]: time}},
                    {datetime_end: {[Op.gte]: time}},
                ]
            },
        });
    }
}

module.exports = new TableReservationRepository();


