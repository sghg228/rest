class Response {
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *      Response:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: Response message
 *          status:
 *            type: integer
 *            description: Response status
 *        example:
 *          message: Update successful
 *          status: 200
 */
module.exports = Response;


