'use strict'
const joi = require('joi')
module.exports = () => {
  return async (ctx, next) => {
    ctx.validateBody = validateBody
    await next()
  }
}

function validateBody (ctx, rule) {
  validate(ctx.request.body, rule)
}

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
