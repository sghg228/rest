module.exports = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Restaurant API",
            version: "1.0.0",
            description: "The server provides an opportunity to book tables in the restaurant."
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        servers: [
            {
                url: "http://localhost:2001"
            }
        ],
    },
    apis: ["src/routes/*.js", "src/models/*.js", "src/utils/*.js", "src/errors/*.js"]
}
