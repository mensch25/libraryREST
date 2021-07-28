# libraryREST

API методы:

* Добавить книгу:

`POST /books {"title": "<title>","author": "<author>", "yearOfPublishing": <year>}`

* Добавить пользователя:

`POST /users {"name": "<name>"}`

* Взять книгу:

У пользователя должен быть куплен абонемент и один пользователь не может взять больше 5 книг

`PUT /users/take?user=<userId>&book=<bookId>`

* Вернуть книгу:

`PUT /return?book=<bookId>`

* Получить список всех пользователей: 

`GET /users`

* Получить конкретного пользователя:

`GET /users/<id>`

* Получить список книг:

`GET /books`

* Получить конкретную книгу:

`GET /books/<id>`

* Получить список доступных книг:

`GET /books/available`

* Купить абонемент пользователю:

`PUT /users/subscription?id=<id>`
