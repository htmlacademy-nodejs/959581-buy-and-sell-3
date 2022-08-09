'use strict';

const {Router} = require(`express`);
const {getAPI} = require('../api');
const myRouter = new Router();
const api = getAPI();

myRouter.get(`/`, (req, res) => res.send(`/my`));
myRouter.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`pages/comments`, {offers: offers.slice(0, 3)});
});

module.exports = myRouter;
