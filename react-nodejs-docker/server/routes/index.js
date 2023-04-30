const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.main);
router.get("/test", controller.test);

router.post("/crawling", controller.ranking);

module.exports = router;