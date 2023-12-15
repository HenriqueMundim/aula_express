const express = require('express')
const { listUser, registerUser, updateUser, deleteUser } = require('../controllers/user/user')

const routes = express()

routes.get('/user', listUser)
routes.post('/user', registerUser)
routes.put('/user/:id', updateUser)
routes.delete('/user/:id', deleteUser)

module.exports = routes



