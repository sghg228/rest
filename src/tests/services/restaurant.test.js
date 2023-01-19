 const restaurantService = require("../../services/restaurant");
const userService = require("../../services/user");
const tableReservationService = require("../../services/tableReservation");
const restaurantRepository = require("../../repository/restaurant");
const ConflictError = require("../../errors/ConflictError");
const ForbiddenError = require("../../errors/ForbiddenError");

describe("RestaurantService: create", () => {
    let restaurantDate;

    beforeEach(() => {
        restaurantDate = {
            "name": "ResTop",
            "user_id": 1
        }
    });

    test("successful create restaurant", async () => {
        restaurantRepository.findByName = jest.fn().mockResolvedValue(null);
        userService.changeRole = jest.fn();
        restaurantRepository.create = jest.fn((data) => {
            data.id = 1;
            return data;
        });

        const result = await restaurantService.create(restaurantDate);

        expect(result.id).not.toBeUndefined();
        expect(restaurantRepository.create).toHaveBeenCalledTimes(1);
        expect(userService.changeRole).toHaveBeenCalledTimes(1);
    })

    test("name  is not unique", async () => {
        restaurantRepository.findByName = jest.fn().mockResolvedValue({});
        try {
            await restaurantService.create(restaurantDate);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictError);
            expect(err.message).toEqual(`Restaurant with name: ${restaurantDate.name} already exist`);
        }
    })

});

describe("RestaurantService: update", () => {
    let restaurantDate;
    const id = 1;
    const userId = 1;
    beforeEach(() => {
        restaurantDate = {
            "name": "ResTop",
            "user_id": 1
        }
    });

    test("successful update restaurant", async () => {
        restaurantRepository.findById = jest.fn().mockResolvedValue({
            name: restaurantDate.name,
            user_id: userId
        });
        restaurantRepository.update = jest.fn();

        await restaurantService.update(id, restaurantDate, userId);

        expect(restaurantRepository.update).toHaveBeenCalledTimes(1);
    })

    test("user is trying to update the wrong restaurant", async () => {
        restaurantRepository.findById = jest.fn().mockResolvedValue({name: restaurantDate.name + "q"});
        restaurantRepository.findByName = jest.fn().mockResolvedValue({});
        try {
            await restaurantService.update(id, restaurantDate, userId);
        } catch (err) {
            expect(err).toBeInstanceOf(ForbiddenError);
        }

    })

    test("new name is not unique", async () => {
        restaurantRepository.findById = jest.fn().mockResolvedValue({
            name: restaurantDate.name + " q",
            user_id: userId
        });
        restaurantRepository.findByName = jest.fn().mockResolvedValue({});
        try {
            await restaurantService.update(id, restaurantDate, userId);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictError);
            expect(err.message).toEqual(`Restaurant with name: ${restaurantDate.name} already exist`);
        }
    })

});

describe("RestaurantService: delete", () => {
    const userId = 1;
    const id = 1;

    test("successful delete restaurant from db", async () => {
        restaurantRepository.findById = jest.fn().mockResolvedValue({user_id: userId});
        tableReservationService.findAllByRestaurantId = jest.fn().mockResolvedValue(new Array());
        restaurantRepository.delete = jest.fn();
        await restaurantService.delete(id, userId);

        expect(restaurantRepository.delete).toHaveBeenCalledTimes(1);
    })

    test("successful mark as deleted restaurant", async () => {
        restaurantRepository.findById = jest.fn().mockResolvedValue({user_id: userId});
        tableReservationService.findAllByRestaurantId = jest.fn().mockResolvedValue(new Array({}));
        restaurantRepository.update = jest.fn();

        await restaurantService.delete(id, userId);

        expect(restaurantRepository.update).toHaveBeenCalledTimes(1);
    })

    test("user doesn't have access", async () => {
        restaurantRepository.findById = jest.fn().mockResolvedValue({});
        try {
            await restaurantService.delete(id, userId);
        } catch (err) {
            expect(err).toBeInstanceOf(ForbiddenError);
        }

    })
})

