const { client } = require('../config/db')

const getTodoModel = async () => {
  const result = await client.query('SELECT * FROM todoSchema.todo ORDER BY todo_id;')
  if (result.rows) return result.rows
  throw new Error('Failed to get todos')
}

const createTodoModel = async (todoText) => { // post all fields
  console.log('createTodoModel : >>>>>>>>', todoText)
  const insertQuery = `INSERT INTO todoSchema.todo (title) VALUES ('${todoText}') RETURNING todo_id, title;`
  const result = await client.query(insertQuery)
  if (result.rowCount === 1) return result.rows[0]
  // return result.rowCount // null
  // throw new Error('Failed to create todo')
}

const updateTodoModel = async (id, todoText, todoNote, dueDate, priority, isChecked) => {
  const updateQuery = `UPDATE todoSchema.todo
    SET title = '${todoText}', notes = '${todoNote}', due_date = '${dueDate}', priority = '${priority}', is_checked = '${isChecked}'
    WHERE todo_id = ${id} RETURNING todo_id, title, notes, due_date, priority, is_checked;`
  const result = await client.query(updateQuery)
  if (result.rowCount === 1) return result.rows[0]
  // return result.rowCount // null
  // throw new Error('Failed to update todo')
}

const deleteTodoModel = async (id) => {
  const deleteQuery = `DELETE FROM todoSchema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(deleteQuery)
  // if (result.rowCount === 1) return result.rowCount
  return result.rowCount
  // throw new Error('Failed to delete todo')
}

const getTodoByIdTodo = async (id) => {
  const getByIdQuery = `SELECT FROM todoSchema.todo
    WHERE todo_id = ${id};`
  const result = await client.query(getByIdQuery)
  return result.rowCount
}

module.exports = { createTodoModel, getTodoModel, updateTodoModel, deleteTodoModel, getTodoByIdTodo }
