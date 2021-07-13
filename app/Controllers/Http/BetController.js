'use strict'

const Bet = use('App/Models/Bet')

class BetController {
  async index() {
    const bets = await Bet.query().with('user').fetch()
    return bets
  }

  async store({ request, response, auth }) {
    try {
      const data = request.all()
      const bet = await Bet.create({
        ...data,
        user_id: auth.user.id
      })
      return bet
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Error occured' } })
    }
  }
}

module.exports = BetController
