'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetSchema extends Schema {
  up() {
    this.create('bets', (table) => {
      table.increments()
      table.string('index').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('numbers', 200).notNullable()
      table.string('date', 20).notNullable()
      table.float('price', 20).notNullable()
      table.string('type', 20).notNullable()
      table.string('color', 20).notNullable()
      table.integer('max-number').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('bets')
  }
}

module.exports = BetSchema
