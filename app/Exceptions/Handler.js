'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response }) {
    if (error.name === 'ValidationException') {
      return response
        .status(error.status)
        .send({ error: { messages: error.messages } })
    }

    return response
      .status(error.status)
      .send({ error: { message: error.message } })
  }

  async report(error, { request }) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
