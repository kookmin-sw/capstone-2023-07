const express = require('express');
const routes = require("./routes");
const bodyParser = require("body-parser")
const { swaggerUi, specs } = require("./routes/swagger")
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(bodyParser.json())
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => console.log(`Listening on port ${port}`));