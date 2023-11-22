const express = require('express')
const router = express.Router()
const PeopleControllers = require('../controllers/people.controller')
const { body, param, query, validationResult } = require('express-validator');


const isAgeValid = (value) => {
    if (typeof value === "number" && value > 0 && value < 150) {
        return true;
    }
    return false;
};
const validateDataBody = [
    body('name')
        .isString()
        .isAlpha()
        .isLength({ min: 3, max: 10 }).withMessage("Имя пользователя должно содержать не менее 3 символов"),
    body('age').custom(isAgeValid).withMessage("Неверно указан возраст"),
    body('isMan').isBoolean().withMessage("Только булевое значение"),
    body('id').isInt().withMessage('ID не совпадает')]

const validateDataId = param("id").isInt().withMessage("Такого ID не существует");

const validateDataQuery = [
    query('min').isInt().withMessage('Минимальный возраст - целое число'),
    query('max').isInt().withMessage('Максимальный возраст - целое число')]

router.get('/', PeopleControllers.getPeople)

router.get('/filtered', validateDataQuery, PeopleControllers.getFilteredPeople)

router.post('/create', validateDataBody, PeopleControllers.createPeople)


router.put('/edit/:id', validateDataId, PeopleControllers.editPeople)

router.delete('/delete/:id', PeopleControllers.deletePeople)


module.exports = router