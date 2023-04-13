var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Test Title",
            version: "0.1.0",
            description:
                "Test description",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:5000/",
            },
        ],
        
        paths: {
            "/test": {
                get: {
                    tags: ["test"],
                    summary: "main test",
                    parameters: [],
                    responses: {
                        "200": {
                            description: "success",
                        }
                    }
                }
            },
            "/crawling" : {
                post: {
                    tags: ["crawling"],
                    summary: "crawling test",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/definitions/name'
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "success"
                        },
                        404: {
                            description: "failed"
                        }
                    }
                }
            }
        },
        definitions: {
            name: {
                properties: {
                    "username": {
                        "type": "string"
                    },
                }
            }
        }
    },
    apis: ["./routes/*.js"],
};
    
const specs = swaggerJsdoc(options);


module.exports = { swaggerUi, specs };