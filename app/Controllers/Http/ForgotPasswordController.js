'use strict'

const User = use('App/Models/User')
const crypto = require('crypto')
const Mail = use('Mail')
const moment = require('moment')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')
      const redirect_url = request.input('redirect_url')

      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        'forgot_password.edge',
        {
          email,
          token: user.token,
          link: `${redirect_url}?token=${user.token}`
        },
        (message) => {
          message.from('felipecschramm@hotmail.com')
          message.to(user.email)
          message.subject('Recuperacao de Senha')
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'User not registered' } })
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)
      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)
      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'O token de recuperação está expirado'
          }
        })
      }

      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Algo deu errado ao resetar sua senha'
        }
      })
    }
  }
}

module.exports = ForgotPasswordController
