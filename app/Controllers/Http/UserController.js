'use strict'

const User = use('App/Models/User')
const Database = use("Database");
const Mail = use('Mail')

class UserController {
    async store({request}){
        const data = request.only(['username','email','password'])
        const trx = await Database.beginTransaction();
        const user = await User.create(data, trx)

        await Mail.send('welcome.edge',{name:data.username}, message =>{
            message
            .to(data.email)
            .from('felipecschramm@hotmail.com')
            .subject('Bem-vindo ao The Greatest App for Lottery')
        })
        await trx.commit()
        return user
    }
}

module.exports = UserController
