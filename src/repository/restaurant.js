const Restaurant = require('../models/restaurant');
const Scheme = require('../models/scheme');
const Table = require('../models/table');

class RestaurantRepository {
    async findAll(match, sort, pagination) {
        return await Restaurant.findAll({
            where: match,
            order: sort,
            offset: pagination.offset,
            limit: pagination.limit,
        });
    }

    async findByUserId(id) {
        return await Restaurant.findAll({where: {user_id: id}});
    }

    async findById(id) {
        return await Restaurant.findByPk(id);
    }

    async findByName(name) {
        return await Restaurant.findOne({where: {name: name}});
    }

    async create(restaurantData) {
        return Restaurant.create(restaurantData, {
            include: [{
                model: Scheme,
                include: [Table]
            }]
        });
    }

    async update(id, restaurantData) {
        return await Restaurant.update(restaurantData, {where: {id: id}});
    }

    async delete(id) {
        return await Restaurant.destroy({where: {id: id}});
    }

    async getTotalSize() {
        return await Restaurant.count();
    }
}

module.exports = new RestaurantRepository();


