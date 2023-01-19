const tableReservationRepository = require('../repository/tableReservation');
const tableService = require('../services/table');
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const constants = require("../constants");
const ForbiddenError = require("../errors/ForbiddenError");

class TableReservationService {
    async findAllByUserId(userId, sort, pagination) {
        return await tableReservationRepository.findAllByUserId(userId, sort, pagination);
    }

    async findAllByRestaurantId(restaurantId, sort, pagination) {
        return await tableReservationRepository.findAllByRestaurantId(restaurantId, sort, pagination);
    }

    async findAllByTableId(tableId) {
        return await tableReservationRepository.findAllByTableId(tableId);
    }

    async create(reservationData) {
        await this.checkTableExist(reservationData.table_id);
        await this.checkTableIsFreeForThisTime(reservationData.table_id,
            reservationData.datetime_begin,
            reservationData.datetime_end
        );

        return await tableReservationRepository.create(reservationData);
    }

    async changeStatus(id, data) {
        await this.checkReservationExist(id);
        await this.checkCanChangeStatus(id);
        const dataToUpdate = {
            status: data.status
        }
        return await tableReservationRepository.update(id, dataToUpdate);
    }

    async isReservedTable(tableId, time) {
        return await tableReservationRepository.countTableReservations(tableId, time) > 1;
    }

    async countReservedTableBySchemeId(schemeId, time) {
        return await tableReservationRepository.countReservedTableBySchemeId(schemeId, time);
    }

    async checkReservationExist(id) {
        const reservation = await tableReservationRepository.findById(id);
        if (!reservation) {
            throw new NotFoundError(`Reservation with id = ${id} not found`);
        }
    }

    async checkCanChangeStatus(id) {
        const reservation = await tableReservationRepository.findById(id);

        if (reservation.status !== constants.bookedReservationStatusNum) {
            throw new ForbiddenError(`Status can't be changed, current status: ${reservation.status}`);
        }
    }

    async checkTableExist(tableId) {
        const table = await tableService.findById(tableId);
        if (!table) {
            throw new NotFoundError(`Table with id = ${tableId} not found`);
        }
    }

    async checkTableIsFreeForThisTime(tableId, startTime, endTime) {
        const reservation = await tableReservationRepository.findAllBookedByTableIdAndReservationTime(tableId, startTime, endTime);
        if (reservation) {
            throw new ConflictError(`Table with id = ${tableId} from ${reservation.datetime_begin} to ${reservation.datetime_end} is taken`);
        }
    }
}

module.exports = new TableReservationService();


