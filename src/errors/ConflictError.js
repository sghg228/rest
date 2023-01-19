class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "Conflict";
        this.status = 409;
    }
}

module.exports = ConflictError;

