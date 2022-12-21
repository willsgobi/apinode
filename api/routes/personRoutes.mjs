import { Router } from "express"
import Person from "../models/Person.mjs"

const router = Router()


// create
router.post("/", async (req, res) => {

    // tratar dados do body
    const { name, salary, approved } = req.body

    if (!name || !salary) {
        res.status(422).json({ error: "Dados inválidos, tente novamente." })
    }

    const person = {
        name,
        salary,
        approved
    }

    // create
    try {

        // criando dados
        var newPerson = await Person.create(person)

        console.log(newPerson)

        res.status(201).json(JSON.stringify(person))

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// read
router.get('/', async (req, res) => {

    try {
        const people = await Person.find()

        if (people === null) {
            res.status(424).json({ message: "O usuário não foi encontrado!" })
            return
        }

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (person === null) {
            res.status(424).json({ message: "O usuário não foi encontrado!" })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// update

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(400).json({ message: "Usuário não encontrado" })
            return
        }

        res.status(204).json(updatedPerson)


    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// delete

router.delete("/:id", async (req, res) => {

    const id = req.params.id

    try {

        const deletedPerson = await Person.deleteOne({ _id: id })

        if (deletedPerson.deletedCount > 0) {
            res.status(200).json({ message: "Usuário deletado com sucesso!" })
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

export default router