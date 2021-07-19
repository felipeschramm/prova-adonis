'use strict'

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')
const Mail = use('Mail')

class BetController {
  async index({ auth }) {
    try {
      const bets = await Bet.query().where('user_id', auth.user.id).fetch()
      return bets
    } catch (error) {
      console.log(error)
    }
  }

  async store({ request, auth }) {
    const data = request.only([
      'numbers',
      'date',
      'type',
      'index',
      'color',
      'price',
      'max-number'
    ])
    const bet = await Bet.create({
      user_id: auth.user.id,
      ...data
    })

    return bet
  }

  async send({auth}) {
    await Mail.send(
      'newbet.edge',
      {
        email: auth.user.email
      },
      (message) => {
        message.from('felipecschramm@hotmail.com')
        message.to(auth.user.email)
        message.subject('Novas Apostas')
      }
    )
  }
}

module.exports = BetController
