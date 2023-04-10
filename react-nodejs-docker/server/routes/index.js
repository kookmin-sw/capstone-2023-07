const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.main);

/**
* @swagger
* paths:
*  /test:
*   get:
*     tags: [API test]
*     summary: API test
*     responses:
*       "200":
*         description: TEST성공
*/
router.get("/test", controller.test);

module.exports = router;