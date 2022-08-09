'use strict';

const {Router} = require(`express`);
const {getAPI} = require('../api');
const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/login`, (req, res) => res.render(`pages/login`));

mainRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`pages/main`, {offers});
});

module.exports = mainRouter;
