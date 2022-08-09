const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const express = require('express');
const {HttpCode} = require('../../utils');
const {getLogger} = require('../lib/logger');

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const logger = getLogger({name: `api`});
const app = express();
app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (_error) {
    res.send([])
  }
})

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
     .send(`Not found`);
})

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
     .send(`Not found`);

  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

module.exports = {
  name: '--server',
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port)
    .on(`listening`, (_err) => {
      logger.info(chalk.green(`Ожидаю соединений на ${port}`));
    })
    .on(`error`, ({message}) => {
      logger.error(chalk.red(`Ошибка при создании сервера: ${message}`));
    });
  }
}
