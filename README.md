Nodejs Express Joi starter with Swagger
=======================================



**Demo**: https://node-express-joi-starter.herokuapp.com/

A boilerplate for nodejs api based on express with Joi validator and swagger

There are a lot of boilerplates node api can be found today. But I wasn't be able to find boilerplate on express
with validation and documentation at once. I prepared all in one starter. I hope this will help someone.

Overview
--------
This is a boilerplate of REST API on [`Nodejs`](https://nodejs.org/en/) based on [`Express`](http://expressjs.com/)
with [`Joi validator`](https://github.com/hapijs/joi/blob/v10.6.0/API.md) and [Swagger documentation](https://swagger.io/specification/).
Code based on ES6, async/await and as a consequence requires Node version >= 7.6.
For example was implemented CRUD for User model and authentication using [JWT token](https://jwt.io/). Also user session with JWT token stored in db.
The root of api is swagger ui based on [swagger.json](https://github.com/igormigunov/node-express-joi-starter/blob/master/public/swagger/swagger.json).
It can be made using `npm run yaml2json`. Package [yaml2json](https://www.npmjs.com/package/yaml2json) should be installed globally `npm install -g yaml2json`.

Getting Started
---------------

```bash
# Clone the repository
git clone https://github.com/igormigunov/node-express-joi-starter.git

# Change directory
cd node-express-joi-starter

# Install dependencies
yarn install

# Start it in simple mode
npm start

# Start in dev mode using nodemoon
npm run dev
```

Project Structure
-----------------
* folders
 * [controllers](https://github.com/igormigunov/node-express-joi-starter/tree/master/controllers) - Routes modules
 * [models](https://github.com/igormigunov/node-express-joi-starter/tree/master/models) - Mongoose models
 * [module](https://github.com/igormigunov/node-express-joi-starter/tree/master/modules) - Helper modules for reuse in other project modules
 * [public](https://github.com/igormigunov/node-express-joi-starter/tree/master/public) - Static content
 * [tests](https://github.com/igormigunov/node-express-joi-starter/tree/master/tests) - Tests
* files
 * [index.js](https://github.com/igormigunov/node-express-joi-starter/blob/master/index.js) - Application Entrypoint
 * [app.js](https://github.com/igormigunov/node-express-joi-starter/blob/master/app.js) - Main application file
 * [.env](https://github.com/igormigunov/node-express-joi-starter/blob/master/.env) - Environment Variables
 * [.env.test](https://github.com/igormigunov/node-express-joi-starter/blob/master/.env.test) - Environment Variables for tests
* Structure based on [hackathon-starter](https://github.com/sahat/hackathon-starter)

Models
------
Mongoose models contains Joi validators and some plugins. Plugins:
* [mongoose-delete](https://github.com/dsanel/mongoose-delete/)
* [mongoose-timestamp](https://github.com/drudge/mongoose-timestamp)

Joi
---
For mongoose models should be used `validate` object with keys
`params`, `body` or `query` for validity appropriate request parts.
For each controllers should be defined `validate` method which should be used
with [celebrate](https://github.com/continuationlabs/celebrate) middleware in `app.js`.

Swagger
-------
At first should be corrected [swagger.yaml](https://github.com/igormigunov/node-express-joi-starter/blob/master/public/swagger/swagger.yaml) file according to needed models.
After should do `npm run yaml2json` and `swagger.json` is ready

Environment Variables
---------------------
* MONGODB_URI - mongodb connection string
* JWT_SECRET - Your JWT secret
* SESSION_EXP - Session and JWT token lifetime in second

Tests
-----
CRUD operations for user implemented in [test](https://github.com/igormigunov/node-express-joi-starter/blob/master/tests/user.crud.test.js). It contains `before` method that
clear database before tests start. Just `npm run test` to start it.
Test use [.env.test](https://github.com/igormigunov/node-express-joi-starter/blob/master/.env.test) environment variables file.

Requirements
------------
* [Nodejs](https://nodejs.org/en/) >= 7.6
* [Mongodb](https://www.mongodb.com/)

Docker
------
```bash
docker-compose up
```
