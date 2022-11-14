const mongoose = require('mongoose')

const Employee = mongoose.model('Employee',{
id: Number,
nome: String,
endereco: String,
tel: Number,
salario: Number,
approved: Boolean,
})

module.exports = Employee