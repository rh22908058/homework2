var mongoose = require('mongoose')
var userSchema = require('../schemas/users')

var Users = mongoose.model('Users', userSchema)
module.exports = Users