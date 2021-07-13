'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('reset', 'ForgotPasswordController.store')
// Route.get('edge', ({view})=>{
//     return view.render('forgot_password')
// })