'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('reset', 'ForgotPasswordController.store')
Route.put('reset', 'ForgotPasswordController.update')

Route.get('bets', 'BetController.index')
Route.group(() => {
  Route.post('bet', 'BetController.store')
}).middleware(['auth'])
// Route.get('edge', ({view})=>{
//     return view.render('forgot_password')
// })
