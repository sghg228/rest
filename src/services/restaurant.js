const restaurantRepository = require('../repository/restaurant');
const userService = require('../services/user');
const tableReservationService = require('../services/tableReservation');
const constants = require('../constants')
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

class RestaurantService {
    async findAll(match, sort, pagination) {
        return await restaurantRepository.findAll(match, sort, pagination);
    }

    async findByUserId(id) {
        return await restaurantRepository.findByUserId(id);
    }

    async findById(id) {
        return await restaurantRepository.findById(id);
    }

    async create(restaurantData) {
        //TODO: use transaction:
        await this.checkNameIsUnique(restaurantData.name);

        const userId = restaurantData.user_id;
        await userService.changeRole(userId, constants.managerRoleNum);

        return await restaurantRepository.create(restaurantData);
    }

    async update(id, restaurantData, userId) {
        const old = await restaurantRepository.findById(id);
        if (!old) {
            throw new NotFoundError(`Restaurant with id = ${id} not found`);
        }
        this.checkUserHaveAccess(old, userId);
        if (old.name !== restaurantData.name) {
            await this.checkNameIsUnique(restaurantData.name);
        }
        await restaurantRepository.update(id, restaurantData);
    }

    async delete(id, userId) {
        const restaurant = await this.checkRestaurantExist(id);
        this.checkUserHaveAccess(restaurant, userId);

        if (await this.canDelete(id)) {
            await restaurantRepository.delete(id);
        } else {
            const restaurantData = {status: constants.restaurantNotActiveNum};
            await restaurantRepository.update(id, restaurantData);
        }
    }

    async getTotalSize() {
        return await restaurantRepository.getTotalSize();
    }

    checkUserHaveAccess(restaurantData, ownerId) {
        if (restaurantData.user_id !== ownerId) {
            throw new ForbiddenError("Forbidden");
        }
    }

    async checkRestaurantExist(id) {
        const restaurant = await restaurantRepository.findById(id);
        if (!restaurant) {
            throw new NotFoundError(`Restaurant wit id = ${id} not found`);
        }
        return restaurant;
    }

    async canDelete(id) {
        const reservations = await tableReservationService.findAllByRestaurantId(id, [], {});
        return reservations.length === 0;
    }

    async checkNameIsUnique(name) {
        if (!name) {
            return;
            l
        }
        let restaurant = await restaurantRepository.findByName(name);
        if (restaurant) {
            throw new ConflictError(`Restaurant with name: ${name} already exist`);
        }
    }
}

module.exports = new RestaurantService();


