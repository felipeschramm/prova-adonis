'use strict'

const User = use('App/Models/User')
const crypto = require('crypto')
const Mail = use('Mail')

class ForgotPasswordController {
    async store({request, response}){
       try{
        const email = request.input('email')
        const redirect_url = request.input('redirect_url')

        const user = await User.findByOrFail('email', email)

        user.token = crypto.randomBytes(10).toString('hex')
        user.token_created_at = new Date()

        await user.save()

        await Mail.send('forgot_password.edge', {email, token:user.token, link:`${redirect_url}?token=${user.token}`}, (message) => {
            message.from('felipecschramm@hotmail.com')
            message.to(user.email)
            message.subject('Recuperacao de Senha')
        })

       }catch(err){
            return response.status(err.status).send({error:{message: 'User not registered'}})
       }
    }
}

module.exports = ForgotPasswordController
