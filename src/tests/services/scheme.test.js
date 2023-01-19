const schemeService = require("../../services/scheme");
const restaurantService = require("../../services/restaurant")
const schemeRepository = require("../../repository/scheme")
const ForbiddenError = require("../../errors/ForbiddenError");

describe("SchemeService: update", () => {
    const id = 1;
    const data = {};
    const userId = 1;

    test("successfully update scheme", async () => {
        schemeRepository.findById = jest.fn().mockResolvedValue({restaurant_id: 1});
        restaurantService.findById = jest.fn().mockResolvedValue({user_id: userId});
        schemeRepository.update = jest.fn();

        await schemeService.update(id, data, userId);

        expect(schemeRepository.update).toBeCalledTimes(1);
    })

    test("user doesn't have access", async () => {
        schemeRepository.findById = jest.fn().mockResolvedValue({restaurant_id: 1});
        restaurantService.findById = jest.fn().mockResolvedValue({});

        try {
            await schemeService.update(id, data, userId);
        } catch (err) {
            expect(err).toBeInstanceOf(ForbiddenError);
        }

    })
})

