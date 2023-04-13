const express = require('express');
const routes = require("./routes");
const bodyParser = require("body-parser")
const { swaggerUi, specs } = require("./routes/swagger")

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => console.log(`Listening on port ${port}`));