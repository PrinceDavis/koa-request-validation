# koa-request-validation

Object schema description language and validator for JavaScript objects.

[![Build Status](https://api.travis-ci.org/PrinceDavis/koa-request-validation.svg?branch=master)](https://travis-ci.org/PrinceDavis/koa-request-validation)

[![Issue Opened](https://img.shields.io/github/issues/PrinceDavis/koa-request-validation.svg?style=flat-square)](https://github.com/PrinceDavis/koa-request-validation/issues)
[![npm Version](https://img.shields.io/npm/v/koa-request-validation.svg)](https://www.npmjs.com/package/koa-request-validation)

[![npm](https://img.shields.io/npm/dw/koa-request-validation.svg?style=flat-square)](https://www.npmjs.com/package/koa-request-validation)

# Introduction

Looking for clean way to run validation against http request parameters, body, and query string is koajs?

Koa-request-validation uses joi schema to validate ensure you are good to go

## Installation
```bash
npm i koa-request-validation
```
## Usage
```javascript

const Koa = require('koa')
const validator = require('koa-request-validation')

let app = new Koa()
app.use(validator())

```
### Example
##### In your controllers/route handlers
###### You can put this rules in a validation rules folder and require them where need to clean you your controllers/request handlers
```javascript
const Joi = require('joi');

const bodyRule = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email()
});

const paramsRule = Joi.object().keys({
    id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
}).required();

const queryRule = Joi.object().keys({
    page: Joi.number().required(),
    token: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required
}).required();

// Run validations.
ctx.validateBody(bodyRule)
ctx.validateParams(paramsRule)
ctx.validateQuery(queryRule)

```