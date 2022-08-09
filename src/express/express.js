'use strict';

const express = require('express');
const path = require(`path`);

// Маршруты приложения мы опишем в отдельных файлах.
// Для определения маршрутов мы воспользуемся Router().
// Примеры маршрутов будут продемонстрированы ниже по тексту.
const offersRoutes = require('./routes/offers-routes');
const myRoutes = require('./routes/my-routes');
const mainRoutes = require('./routes/main-routes');


const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
// зафиксируем порт
const DEFAULT_PORT = 8080;

const app = express();

// подключим созданные маршруты
app.use('/offers', offersRoutes);
app.use('/my', myRoutes);
app.use('/', mainRoutes);

app.listen(DEFAULT_PORT);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
