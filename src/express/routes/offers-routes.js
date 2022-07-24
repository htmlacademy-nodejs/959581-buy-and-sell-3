'use strict';

const {Router} = require('express');
const offersRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `offers`, т.к. уже указали при подключении модуля маршрута
// в `express.js`.
offersRoutes.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id`));
offersRoutes.get(`/add`, (req, res) => res.send(`/offers/add`));
offersRoutes.get(`/edit/:id`, (req, res) => res.send(`offers/edit/:id`));
offersRoutes.get(`/:id`, (req, res) => res.send('/offers/:id'));

module.exports = offersRoutes;
