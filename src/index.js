'use strict'
const joi = require('joi')
module.exports = () => {
  return async (ctx, next) => {
    ctx.validateBody = validateBody.bind(null, ctx)
    ctx.validateParams = validateParams.bind(null, ctx)
    await next()
  }
}

function validateBody (ctx, rule) {
  validate(ctx.request.body, rule)
}

function validateParams (ctx, rule) {
  validate(ctx.params, rule)
}

<<<<<<< HEAD
=======
function validateQuery (ctx, rule) {
  validate(ctx.request.query, rule)
}

>>>>>>> develop
function validate (obj, rule) {
  const options = {
    abortEarly: false,
    stripUnknown: true
  }
  const result = joi.validate(obj, rule, options)
  if (result.error) {
    throw new Error(`validation error ${result.error.message}`)
  }
}
