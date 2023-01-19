const reservationService = require("../../services/tableReservation");
const tableService = require("../../services/table");
const reservationRepository = require("../../repository/tableReservation");
const ConflictError = require("../../errors/ConflictError");
const constants = require("../../constants");
const ForbiddenError = require("../../errors/ForbiddenError");

describe("TableReservationService: create", () => {
    let reservationData;

    beforeEach(() => {
        reservationData = {
            "datetime_begin": "2020-02-08 09:30:00",
            "datetime_end": "2020-02-08 10:30:00",
            "capacity": 1,
            "table_id": 1
        }
    });

    test("successful create reservation", async () => {
        tableService.findById = jest.fn().mockResolvedValue({});
        reservationRepository.findAllBookedByTableIdAndReservationTime = jest.fn().mockResolvedValue(null);
        reservationService.create = jest.fn((data) => {
            data.id = 1;
            return data;
        });

        const result = await reservationService.create(reservationData);

        expect(result.id).not.toBeUndefined();
        expect(reservationService.create).toHaveBeenCalledTimes(1);
    })

    test("table is not free", async () => {
        tableService.findById = jest.fn().mockResolvedValue({});
        const reserved = {
            datetime_begin: 1,
            datetime_end: 2
        };
        reservationRepository.findAllBookedByTableIdAndReservationTime = jest.fn().mockResolvedValue(reserved);
        reservationService.create = jest.fn((data) => {
            data.id = 1;
            return data;
        });

        await reservationService.create(reservationData);

        try {
            await reservationService.create(reservationData);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictError);
            expect(err.message).toEqual(
                `Table with id = ${reservationData.table_id} 
                from ${reserved.datetime_begin} to ${reserved.datetime_end} is taken`
            );
        }
    })

});

describe("TableReservationService: changeStatus", () => {
    const id = 1;
    const data = {
        status: constants.cancelledReservationStatusNum
    }

    test("successful change status", async () => {
        reservationRepository.findById = jest.fn().mockResolvedValue({status: constants.bookedReservationStatusNum});
        reservationRepository.update = jest.fn();

        await reservationService.changeStatus(id, data);

        expect(reservationRepository.update).toHaveBeenCalledTimes(1);
    })

    test("status is not booked", async () => {
        reservationRepository.findById = jest.fn().mockResolvedValue({status: constants.completedReservationStatusNum});
        reservationRepository.update = jest.fn();

        try {
            await reservationService.changeStatus(id, data);
        } catch (err) {
            expect(err).toBeInstanceOf(ForbiddenError);
            expect(err.message).toEqual(
                `Status can't be changed, current status: ${constants.completedReservationStatusNum}`
            );
        }
    })

});


