const Review = require('../models/review');

class ReviewRepository {
    async findAllByRestaurantId(restaurantId) {
        return await Review.findAll({where: {restaurant_id: restaurantId}});
    }

    async findById(id) {
        return await Review.findByPk(id);
    }

    async findByUserIdAndRestaurantId(userId, restaurantId) {
        return await Review.findOne({
            where: {
                user_id: userId,
                restaurant_id: restaurantId
            }
        })
    }

    async create(reviewData) {
        return Review.create(reviewData);
    }

    async updateByUserAndRestaurantId(userId, restaurantId, reviewData) {
        return await Review.update(reviewData, {
            where: {
                user_id: userId,
                restaurant_id: restaurantId
            }
        });
    }
}

module.exports = new ReviewRepository();

