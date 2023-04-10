
const express = require('express');
const routes = require("./routes");
const { swaggerUi, specs } = require("./routes/swagger")

const app = express();
const port = process.env.PORT || 5000;

app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => console.log(`Listening on port ${port}`));