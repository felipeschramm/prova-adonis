'use strict'

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')

class BetController {
  async index({ auth }) {
    try {
      const bets = await Bet.query()
        .with('user')
        .where('user_id', auth.user.id)
        .fetch()
      return bets;
    } catch (error) {
      console.log(error)
    }
  }

  async store({ request, auth }) {
    const data = request.only(['numbers', 'date', 'type'])
    const typeReturned = await Game.findByOrFail('type', data.type)
    const bet = await Bet.create({
      game_id: typeReturned.id,
      user_id: auth.user.id,
      ...data
    })

    // await Mail.send(
    //   'newbet.edge',
    //   {
    //     email:auth.user.email,
    //   },
    //   (message) => {
    //     message.from('felipecschramm@hotmail.com')
    //     message.to(auth.user.email)
    //     message.subject('Novas Apostas')
    //   }
    // )

    return bet
  }
}

module.exports = BetController
