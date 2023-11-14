const express = require('express')
const router = express.Router()
const PeopleControllers = require('../controllers/people.controller')

router.get('/', async (req, res) => {
    try {
        const people = await PeopleControllers.getPeople()
        res.send(people)
    } catch(e){
        console.log(e)
    }
})
router.post('/create', async (req, res) => {
   
    try{
        const newPeople = await PeopleControllers.createPeople(req.body)
        res.send(newPeople)
    } catch(e){
        console.log(e)
    }
})
router.put('/edit/:id', async (req, res) => {
   try{
    const id = +req.params.id
    const editPeople =  await PeopleControllers.editPeople(id, req.body)
    res.send(editPeople)
  } catch (error) {
    console.log(error)
  }
})
router.delete('/delete/:id', async(req, res) => {
    try{
        const id = +req.params.id
        const updatePeople =  await PeopleControllers.deletePeople(id)
        res.send(updatePeople)
      } catch (error) {
        console.log(error)
      }
})

module.exports = router