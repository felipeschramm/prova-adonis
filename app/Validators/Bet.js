'use strict'

class Bet {
  get validateAll() {
    return true
  }
  get rules() {
    return {
      numbers: 'required',
      date: 'required',
      price: 'required',
      type: 'required'
    }
  }
}

module.exports = Bet
