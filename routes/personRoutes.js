/**************************************************************************************
 *  Objetivo: ROTAS DA ENTIDADE PERSON
 *  Autor: Luiz Gustavo
 *  Data: 22/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const Person = require('../models/person')
const router = require('express').Router()


//Read - Get
router.get('/', async (request, response) => {
    try {
        const person = await Person.find()

        response.status(200).json(person)
    } catch (error) {
        response.status(500).json({ message: error })
    }
})

router.get('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            response.status(422).json({ message: 'Usuário não encontrado' })
        } else {
            response.status(200).json(person)
        }

    } catch (error) {
        response.status(500).json({ message: error })
    }
})


//Create - Post
router.post('/', async (request, response) => {

    // request.body
    const { nome, salario, aprovado } = request.body

    if (!nome || !salario) {
        response.status(422).json({ message: 'Dados obrigátorios não foram enviados' })
    } else {
        const person = {
            nome,
            salario,
            aprovado
        }

        try {
            //Criando dados
            await Person.create(person)

            response.status(201).json({ message: 'Pessoa inserida no sistema com sucesso' })

        } catch (error) {
            response.status(500).json({ message: error })
        }
    }
})


// Update - (Put, Patch)
router.put('/:id', async (request, response) => {
    const id = request.params.id
    const { nome, salario, aprovado } = request.body



    if (!nome || !salario) {
        response.status(422).json({ message: 'Dados obrigátorios não foram enviados' })
    } else {
        const person = {
            nome,
            salario,
            aprovado
        }

        try {
            //Criando dados
            const updatePerson = await Person.updateOne({ _id: id }, person)

            if (updatePerson.matchedCount === 0) {
                response.status(422).json({ message: 'Usuário não encontrado' })
            } else {
                response.status(200).json(person)
            }

        } catch (error) {
            response.status(500).json({ message: error })
        }
    }
})


//Delete 
router.delete('/:id', async (request, response) => {
    let id = request.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        response.status(422).json({ message: 'Usuário não encontrado' })
    } else {
        try {
            await Person.deleteOne({ _id: id })

            response.status(200).json({ message: 'Usuário excluido com sucesso' })

        } catch (error) {
            response.status(500).json({ message: error })
        }
    }
})

module.exports = router
