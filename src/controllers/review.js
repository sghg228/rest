const reviewService = require('../services/review');
const Response = require("../utils/response");

class ReviewController {
    async findAllByRestaurantId(req, res, next) {
        const restaurantId = req.params.id;
        try {
            res.json(await reviewService.findAllByRestaurantId(restaurantId));
        } catch (err) {
            return next(err);
        }
    }

    async findRatingByRestaurantId(req, res, next) {
        const restaurantId = req.params.id;
        try {
            const rating = await reviewService.getRatingByRestaurantId(restaurantId);
            const response = {
                restaurantId: restaurantId,
                rating: rating
            }
            res.json(response);
        } catch (err) {
            return next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            res.json(await reviewService.findById(id));
        } catch (err) {
            return next(err);
        }
    }

    async findByUserIdAndRestaurantId(req, res, next) {
        const userId = req.params.userId;
        const restaurantId = req.params.restaurantId;
        try {
            res.json(await reviewService.findByUserIdAndRestaurantId(userId, restaurantId));
        } catch (err) {
            return next(err);
        }
    }

    async create(req, res, next) {
        const reviewData = req.body;
        try {
            reviewData.date = new Date();
            // TODO: add session
            reviewData.user_id = req.session.user.id;
            res.json(await reviewService.create(reviewData));
        } catch (err) {
            return next(err);
        }
    }

    async update(req, res, next) {
        const reviewData = req.body;
        const id = req.params.id;
        try {
            reviewData.date = new Date();
            await reviewService.updateRateAndText(id, reviewData)
            res.json(new Response("Review was successfully updated"));
        } catch (err) {
            return next(err);
        }
    }

}

module.exports = new ReviewController();

