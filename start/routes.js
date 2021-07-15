'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('reset', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('reset', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('bets', 'BetController.index').middleware('auth')
Route.post('bet', 'BetController.store').middleware('auth').validator('Bet')
Route.get('games', 'GameController.index')

// Route.get('edge', ({view})=>{
//     return view.render('forgot_password')
// })
