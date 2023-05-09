const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.main);
router.get("/test", controller.test);

router.post("/update", controller.update);
router.post("/updateItem", controller.updateItem);
router.post("/isUser", controller.isUser);

module.exports = router;