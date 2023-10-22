/**************************************************************************************
 *  Objetivo: CRIAÇÃO DA ENTIDADE DE BANCO - PESSOA
 *  Autor: Luiz Gustavo
 *  Data: 22/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    nome: String,
    salario: Number,
    aprovado: Boolean
})

module.exports = Person