'use strict';

const {Router} = require('express');
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {getAPI} = require('../api');
const {ensureArray} = require('../../utils');

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const offersRoutes = new Router();
const api = getAPI();

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

offersRouter.post(`/add`,
  upload.single(`avatar`), // применяем middleware
  async (req, res) => {

    // в `body` содержатся текстовые данные формы
    // в `file` — данные о сохранённом файле
    const {body, file} = req;
    const offerData = {
      picture: file ? file.filename : ``,
      sum: body.price,
      type: body.action,
      description: body.comment,
      title: body[`ticket-name`],
      category: ensureArray(body.category),
    };

    try {
      await api.createOffer(`/offers`, offerData);
      res.redirect(`/my`);
    } catch (error) {
      res.redirect(`back`);
    }
  }
);

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `offers`, т.к. уже указали при подключении модуля маршрута
// в `express.js`.
offersRoutes.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id`));
offersRoutes.get(`/add`, (req, res) => res.send(`/offers/add`));
offersRoutes.get(`/:id`, (req, res) => res.send('/offers/:id'));
offersRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`pages/ticket-edit`, {offer, categories});
});

module.exports = offersRoutes;
