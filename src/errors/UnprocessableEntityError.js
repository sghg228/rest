class UnprocessableEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = "unprocessable entity";
        this.status = 422;
    }
}

module.exports = UnprocessableEntityError;
