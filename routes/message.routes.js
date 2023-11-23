const express = require('express')
const router = express.Router()
const MessageControllers = require('../controllers/message.controller')
const {body, param, query, validationResult} = require('express-validator')

const validateDataBody = [
    body('id').isInt().withMessage('ID только число'),
    body('message').isString().isLength({min: 2, max: 100}).withMessage('Сообщение должно быть min 2 символа')
]

const validateDataId = param("id").isInt().withMessage("Такого ID не существует");

const validateDataQuery = [
    query('min').isInt().withMessage('ID начала удаления только число'),
    query('max').isInt().withMessage('ID конец удаления только число')]

    /**
 * @swagger
 * /api/message:
 *   get:
 *     summary: Получить список всех сообщений
 *     description: Получение списка сообщений из базы данных.
 *     tags:
 *       - Message
 *     security:
 *     responses:
 *      200:
 *         description: Успешный запрос. Возвращает массив сообщений
 *      500:
 *         description: Ошибка сервера. Не удалось получить список всех сообщений
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

router.get('/', MessageControllers.getMessage)

/**
 * @swagger
 * /api/message/create:
 *    post:
 *      summary: Создать новое сообщение
 *      description: Создание нового сообщения в системе
 *      tags:
 *        - Message
 *      requestBody:
 *        $ref: "#/components/requestBodies/Message"
 *      responses:
 *        200:
 *          description: Сообщение успешно создано
 * components:
 *   requestBodies:
 *     Message:
 *       description: Свойства сообщения, которые были добавлены.
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               message:
 *                 type: string
 *          400:
 *            description: Некорректный запрос. Проверьте параметры запроса
 *          500:
 *            description: Ошибка сервера. Не удалось создать сообщение
 *              
 */

router.post('/create', validateDataBody, MessageControllers.createMessage)

/**
 * @swagger
 * /api/message/edit/{id}:
 *    put:
 *      summary: Обновить сообщение
 *      description: Обновление сообщения в системе по ID
 *      tags:
 *        - Message
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        $ref: "#/components/requestBodies/Message"
 *      responses:
 *        201:
 *          description: Успешное обновление сообщения
 *        400:
 *          description: Некорректный запрос. Проверьте, пожалуйста, ваши исходные данные.
 *        404:
 *          description: Сообщение с указанным идентификатором не найдено.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */


router.put('/edit/:id', validateDataId, MessageControllers.editMessage)

/**
 * @swagger
 * /api/message/delete/filter:
 *    delete:
 *      summary: Удалить пользователя
 *      description: Удаление пользователя из общей базы
 *      tags:
 *        - Message
 *      parameters:
 *        - in: query
 *          name: min
 *          description: Минимальный ID сообщения с которого начать удаление
 *          required: true
 *          schema:
 *            type: integer
 *        - in: query
 *          name: max
 *          description: Максимальный ID сообщения на котором закончить удаление
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Успешное удаление сообщения
 *        404:
 *          description: Сообщение с указанным идентификатором не найдено.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.delete('/delete/filter', validateDataQuery, MessageControllers.deleteMessage)

module.exports = router