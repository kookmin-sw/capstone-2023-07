const router = require("express").Router();
const controller = require("./controller");

router.get("/test", controller.main);

router.post("/crawling", controller.crawling);

module.exports = router;