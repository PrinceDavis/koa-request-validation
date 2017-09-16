'use strict'
require('../test')
const joi = require('joi')
const expect = require('chai').expect
const validator = require('./index')
const myValidator = validator()


const context = {
  request: {}
}

describe('validator', async () => {
  it('should be a function', () => {
    expect(myValidator).to.be.a('function')
  })

  it('should throw error when no parameter is passed', async () => {
    try {
      await myValidator()
    } catch (e) {
      expect(e.message).to.equals("Cannot set property 'validateBody' of undefined")
    }
  })

  it('should throw error when 1 parameter is passed', async () => {
    try {
      await myValidator(context)
    } catch (e) {
      expect(e.message).to.equals('next is not a function')
    }
  })

  it('should added a validateBody function to context', async () => {
    await myValidator(context, ()=>{})
    expect(context.validateBody).to.be.a('function')
  })

  it('should added a validateParams function to context', async () => {
    await myValidator(context, ()=>{})
    expect(context.validateParams).to.be.a('function')
  })

  it('should add a validateQuery function to context', async () => {
    await myValidator(context, ()=>{})
    expect(context.validateQuery).to.be.a('function')
  })
})


describe('validateQuery', () => {
  const rule = joi.object().keys({
    name: joi.string().required(),
    age: joi.number().required()
  })

  it('should call validate function on joi object', async function () {
    const validate = this.sandbox.spy(joi, 'validate')
    await myValidator(context, () => {})
    context.validateQuery(rule)
    expect(validate).to.be.calledOnce
  })

  it('should call validate function on joi object with 3 arguments', async function () {
    const validate = this.sandbox.spy(joi, 'validate')
    await myValidator(context, () => {})
    context.validateQuery(rule)
    expect(validate.firstCall.args.length).to.be.equal(3)
  })
})

