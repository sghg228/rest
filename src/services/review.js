const reviewRepository = require('../repository/review');
const userService = require('../services/user');
const restaurantService = require('../services/restaurant');
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

class ReviewService {
    async findAllByRestaurantId(restaurantId) {
        return await reviewRepository.findAllByRestaurantId(restaurantId);
    }

    async findById(id) {
        return await reviewRepository.findById(id);
    }

    async findByUserIdAndRestaurantId(userId, restaurantId) {
        return await reviewRepository.findByUserIdAndRestaurantId(userId, restaurantId);
    }

    async create(reviewData) {
        await this.checkRestaurantExist(reviewData.restaurant_id);
        await this.checkUserExist(reviewData.user_id);
        await this.checkReviewExist(reviewData.user_id, reviewData.restaurant_id);
        return await reviewRepository.create(reviewData);
    }

    async updateRateAndText(id, reviewData) {
        const review = await reviewRepository.findById(id);
        if (!review) {
            throw new NotFoundError(`Review with id = ${id} not found`);
        }

        const dataToUpdate = {
            rate: reviewData.rate,
            review: reviewData.review
        }

        return await reviewRepository.updateByUserAndRestaurantId(
            review.user_id,
            review.restaurant_id,
            dataToUpdate
        );
    }

    async getRatingByRestaurantId(restaurantId) {
        const reviews = await reviewRepository.findAllByRestaurantId(restaurantId);

        let sum = 0;
        for( let i = 0; i < reviews.length; i++ ){
            sum += parseInt( reviews[i].rate, 10 ) || 0;
        }
        return sum / reviews.length;
    }

    async checkRestaurantExist(restaurantId) {
        const restaurant = await restaurantService.findById(restaurantId);
        if (!restaurant) {
            throw new NotFoundError(`Restaurant with id = ${restaurantId} not found`);
        }
    }

    async checkUserExist(userId) {
        const user = await userService.findById(userId);
        if (!user) {
            throw new NotFoundError(`User with id = ${userId} not found`);
        }
    }

    async checkReviewExist(userId, restaurantId) {
        const review = await reviewRepository.findByUserIdAndRestaurantId(userId, restaurantId);
        if (review) {
            throw new ConflictError(`Review for restaurant with id = ${restaurantId} from user with id = ${userId} already exist`);
        }
    }
}

module.exports = new ReviewService();


