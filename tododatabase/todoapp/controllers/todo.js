const { getTodoModel, createTodoModel, updateTodoModel, deleteTodoModel } = require('../models/todo')

// Get todo
const getTodo = async (req, res) => {
  try {
    const response = await getTodoModel()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Create todo
const createTodo = async (req, res) => {
  try {
    const { todoText } = req.body
    console.log('createTodo todoText : >>>>>>>>', todoText)
    if (todoText === undefined) {
      return res.status(400).json({
        message: 'Bad request'
      })
    }
    const response = await createTodoModel(todoText)
    console.log('createTodo : >>>>>>>>', req.body, response)

    return res.status(201).json({
      message: 'Todo created successfully!',
      data: {
        todo: response
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Edit todo
const editTodo = async (req, res) => {
  try {
    const id = req.params.id
    const { todoText, todoNote, dueDate, priority, isChecked } = req.body
    // if (await getTodoByIdTodo(id) === 0) return res.status(404).json({ message: 'Resource not found' })
    const response = await updateTodoModel(id, todoText, todoNote, dueDate, priority, isChecked)
    console.log('editTodo : >>>>>>>>', response)

    if (response === 0) {
      return res.status(404).json({
        message: 'Resource Not found'
      })
    }

    return res.status(200).json({
      message: 'Todo updated successfully!',
      data: {
        todo: response
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id
    // if (await getTodoByIdTodo(id) === 0) return res.status(404).json({ message: 'Resource not found' })
    const response = await deleteTodoModel(id)
    console.log('deleteTodo : >>>>>>>>', response)

    if (response === 0) {
      return res.status(404).json({
        message: 'Resource Not found'
      })
    }

    return res.status(200).json({
      message: 'Todo deleted successfully!',
      data: {
        row: response
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { createTodo, getTodo, editTodo, deleteTodo }
