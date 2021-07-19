'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const Mail = use('Mail')

class UserController {
  async index({auth}){
    const data = auth.user;
    return data;
  }
  async store({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const trx = await Database.beginTransaction()
    try {
      const user = await User.create(data, trx)

      await Mail.send('welcome.edge', { name: data.username }, (message) => {
        message
          .to(data.email)
          .from('felipecschramm@hotmail.com')
          .subject('Bem-vindo ao The Greatest App for Lottery')
      })
      await trx.commit()
      return user
    } catch (err) {
        return {err}
    }
  }

  async update({request,auth}){
    const {email, username} = request.all()
    const user = await User.findByOrFail('email',email);
    user.email = email;
    user.username = username;
    await user.save()
    return user;
  }
}

module.exports = UserController
