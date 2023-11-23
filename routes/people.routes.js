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

    /**
 * @swagger
 * /api/people:
 *   get:
 *     summary: Получить список всех пользователей
 *     description: Получение списка пользователей из базы данных.
 *     tags:
 *       - People
 *     security:
 *     responses:
 *      200:
 *         description: Успешный запрос. Возвращает массив пользователей
 *      500:
 *         description: Ошибка сервера. Не удалось получить список всех пользователей
 * components:
 *   schemas:
 *     Todo:
 *       type: array
 *       properties:
 *         title:
 *           type: string
 *         isActive:
 *           type: boolean
 *           example: false
 */
router.get('/', PeopleControllers.getPeople)


router.get('/filtered', validateDataQuery, PeopleControllers.getFilteredPeople)


/**
 * @swagger
 * /api/people/create:
 *    post:
 *      summary: Создать нового пользователя
 *      description: Создание нового пользователя в системе
 *      tags:
 *        - People
 *      requestBody:
 *        $ref: "#/components/requestBodies/People"
 *      responses:
 *        200:
 *          description: Пользователь успешно создан
 * components:
 *   requestBodies:
 *     People:
 *       description: Свойства пользователя, которые были добавлены.
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               isMan:
 *                 type: boolean
 *          400:
 *            description: Некорректный запрос. Проверьте параметры запроса
 *          500:
 *            description: Ошибка сервера. Не удалось создать пользователя
 *              
 */


router.post('/create', validateDataBody, PeopleControllers.createPeople)

/**
 * @swagger
 * /api/people/edit/{id}:
 *    put:
 *      summary: Обновить пользователя
 *      description: Обновление пользователя в системе по ID
 *      tags:
 *        - People
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        $ref: "#/components/requestBodies/People"
 *      responses:
 *        201:
 *          description: Успешное обновление пользователя
 *        400:
 *          description: Некорректный запрос. Проверьте, пожалуйста, ваши исходные данные.
 *        404:
 *          description: Пользователь с указанным идентификатором не найдена.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.put('/edit/:id', validateDataId, PeopleControllers.editPeople)

/**
 * @swagger
 * /api/people/delete/{id}:
 *    delete:
 *      summary: Удалить пользователя
 *      description: Удаление пользователя из общей базы
 *      tags:
 *        - People
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Успешное удаление пользователя
 *        404:
 *          description: Пользователь с указанным идентификатором не найдена.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.delete('/delete/:id', PeopleControllers.deletePeople)


module.exports = router