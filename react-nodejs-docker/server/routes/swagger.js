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
                url: "http://localhost:8001/",
            },
            {
                url: "http://dev.pinkbean.kr:8001/",
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
            "/update" : {
                post: {
                    tags: ["crawling"],
                    summary: "update test",
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
            },
            "/updateItem" : {
                post: {
                    tags: ["crawling"],
                    summary: "update test",
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
            },
            "/isUser" : {
                post: {
                    tags: ["user"],
                    summary: "get user",
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