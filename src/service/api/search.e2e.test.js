const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const mockData = [
  {
    "id": "Upn4k7",
    "category": [
      "Журналы"
    ],
    "description": "Бонусом отдам все аксессуары. Товар в отличном состоянии. Таких предложений больше нет! Это настоящая находка для коллекционера!",
    "picture": "item010.jpg",
    "title": "Куплю антиквариат",
    "type": "sale",
    "sum": 43936,
    "comments": [
      {
        "id": "etK-Ij",
        "text": "А где блок питания?"
      },
      {
        "id": "B8fTE0",
        "text": "Вы что?! В магазине дешевле. А сколько игр в комплекте?"
      },
      {
        "id": "TfFVU5",
        "text": "Неплохо, но дорого. Оплата наличными или перевод на карту?"
      }
    ]
  },
  {
    "id": "LlRWPq",
    "category": [
      "Игры"
    ],
    "description": "Продаю с болью в сердце... Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки.",
    "picture": "item12.jpg",
    "title": "Продам отличную подборку фильмов на VHS",
    "type": "offer",
    "sum": 4731,
    "comments": [
      {
        "id": "zRTNHw",
        "text": "Оплата наличными или перевод на карту?"
      },
      {
        "id": "gs8sUy",
        "text": "А где блок питания? С чем связана продажа? Почему так дешёво?"
      },
      {
        "id": "7R8CAm",
        "text": "Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого. С чем связана продажа? Почему так дешёво?"
      },
      {
        "id": "9YPtay",
        "text": "Неплохо, но дорого."
      }
    ]
  },
  {
    "id": "6SnXm7",
    "category": [
      "Игры"
    ],
    "description": "Таких предложений больше нет! Товар в отличном состоянии. Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города.",
    "picture": "item06.jpg",
    "title": "Продам новую приставку Sony Playstation 5",
    "type": "sale",
    "sum": 11589,
    "comments": [
      {
        "id": "GMkLWA",
        "text": "Совсем немного... Продаю в связи с переездом. Отрываю от сердца."
      },
      {
        "id": "-lK8Xx",
        "text": "А где блок питания? Оплата наличными или перевод на карту? Совсем немного..."
      }
    ]
  },
  {
    "id": "OhHK6y",
    "category": [
      "Посуда"
    ],
    "description": "Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки.",
    "picture": "item01.jpg",
    "title": "Куплю антиквариат",
    "type": "offer",
    "sum": 48285,
    "comments": [
      {
        "id": "PM2Cdb",
        "text": "Почему в таком ужасном состоянии?"
      },
      {
        "id": "6PRmR5",
        "text": "А сколько игр в комплекте? Неплохо, но дорого."
      },
      {
        "id": "iO27zR",
        "text": "Неплохо, но дорого. А где блок питания? Вы что?! В магазине дешевле."
      },
      {
        "id": "VimRsr",
        "text": "С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца."
      }
    ]
  },
  {
    "id": "06p1xR",
    "category": [
      "Игры"
    ],
    "description": "Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам.",
    "picture": "item05.jpg",
    "title": "Куплю антиквариат",
    "type": "sale",
    "sum": 33603,
    "comments": [
      {
        "id": "MCgfBR",
        "text": "Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Вы что?! В магазине дешевле."
      },
      {
        "id": "gErVpf",
        "text": "А где блок питания? Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца."
      },
      {
        "id": "ctwFHB",
        "text": "Оплата наличными или перевод на карту?"
      },
      {
        "id": "RYYGYZ",
        "text": "С чем связана продажа? Почему так дешёво?"
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Куплю антиквариат`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(5));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe("Upn4k7"));
});

test(`API returns code 404 if nothing is found`,
  () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
  () => request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST)
);
