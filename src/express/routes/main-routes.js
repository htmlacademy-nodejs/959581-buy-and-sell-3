'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/login`, (req, res) => res.render(`pages/login`));

module.exports = mainRouter;
