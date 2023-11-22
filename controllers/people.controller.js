const PeopleService = require('../services/people.services');
const { body, validationResult } = require('express-validator');

class peopleControllers {

    async getPeople(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const people = await PeopleService.getPeople()
            return res.send(people)
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    async getFilteredPeople(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const min = +req.query.min
            const max = +req.query.max
            const filteredPeople = await PeopleService.getFilteredPeople(min, max)
            return res.send(filteredPeople)
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    async createPeople(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const newPeople = await PeopleService.createPeople(req.body);
            return res.send(newPeople)
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    async editPeople(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const id = +req.params.id
            const editPeopele = await PeopleService.editPeople(id, req.body)
            return res.send(editPeopele)
        } catch (error) {
            Sentry.captureException(error);
        };
    }

    async deletePeople(req, res) {
        try {
            const id = +req.params.id
            const updatePeople = await PeopleService.deletePeople(id)
            return res.send(updatePeople)
        } catch (error) {
            Sentry.captureException(error)
        }
    }
}

module.exports = new peopleControllers()

