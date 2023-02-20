const express = require('express')
const todoController = require('../controllers/todo')

const router = express.Router()
// Router middle-ware for get request
router.get('/', todoController.getTodo)
router.post('/', todoController.createTodo)
router.put('/:id', todoController.editTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router
