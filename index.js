
require('dotenv').config();
const fs = require("fs");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec.js'); 
const app = express();
const Sentry = require("@sentry/node");
Sentry.init({
    dsn: 'https://24b52ddf17d05bb834c99164e32b6eb7@o4506247310344192.ingest.sentry.io/4506247335772160'
  });
const bodyParser = require('body-parser')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const routes = require("./routes/index")
app.use("/api", routes)
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


