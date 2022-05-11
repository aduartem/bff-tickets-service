const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const expressRoutemap = require('express-routemap');

const config = require('./app/config/config');
const logger = require('./app/config/winston');
const authGuard = require('./app/middleware/validate-bearer-token');

const app = express();

dotenv.config();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

app.use(authGuard.validateBearerToken);

const BASE_PATH = '/api/v1/bff/';
app.use(BASE_PATH, require('./app/routes/index'));

app.listen(config.app.port, () => {
  logger.info(`Server on port: ${config.app.port}`);
  expressRoutemap(app);
});

module.exports = app;
