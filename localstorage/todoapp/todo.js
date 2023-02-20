
let todos = []

// Get data from local storage
const read = () => {
  return window.localStorage.getItem('todos')
}

// Set data to local storage
const updateData = () => {
  console.log('updateData', todos)
  return window.localStorage.setItem('todos', JSON.stringify(todos))
}

const createText = (todo) => {
  const inputText = document.createElement('input')

  inputText.setAttribute('class', 'todo-text') // remove id attr, set class attr
  inputText.setAttribute('type', 'text')
  inputText.value = todo.todoText

  // Event listeners
  inputText.addEventListener('click', () => {
    const editItem = document.getElementById(todo.id).querySelector('.edit-item')
    editItem.style.display === 'block' ? editItem.style.display = 'none' : editItem.style.display = 'block'
  })

  inputText.addEventListener('change', (event) => {
    todo.todoText = event.target.value
    updateData()
  })

  return inputText
}

const createCheckbox = (todo) => {
  const inputCheckbox = document.createElement('input')

  inputCheckbox.setAttribute('class', 'checkbox')// remove id attr, set class attr
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.checked = todo.isChecked

  inputCheckbox.addEventListener('change', () => {
    todo.isChecked = inputCheckbox.checked
    updateData()
  })

  return inputCheckbox
}

const createTodoItem = (todo) => {
  console.log('createTodoItem ', todo)

  const todoItem = document.createElement('div') // rename to todoItem
  todoItem.setAttribute('id', todo.id)
  todoItem.setAttribute('class', 'todo-item')

  todoItem.appendChild(createCheckbox(todo))
  todoItem.appendChild(createText(todo))

  return todoItem
}

const createTextArea = (todo) => {
  const textArea = document.createElement('textarea')

  textArea.setAttribute('class', 'text-area') // remove id, add class
  textArea.setAttribute('placeholder', 'Notes')
  todo.todoNote ? textArea.value = todo.todoNote : textArea.value = ''

  textArea.addEventListener('change', (event) => {
    todo.todoNote = event.target.value
    updateData()
  })

  return textArea
}

const createDateTime = (todo) => {
  const inputDateTime = document.createElement('input')

  inputDateTime.setAttribute('id', 'date-time')
  inputDateTime.setAttribute('type', 'datetime-local')
  inputDateTime.setAttribute('value', todo.dueDate)

  inputDateTime.addEventListener('change', (event) => {
    todo.dueDate = event.target.value
    // inputDateTime.setAttribute('value', todo.dueDate)
    updateData()
  })

  return inputDateTime
}

const createDeleteBtn = (todo) => {
  const deleteBtn = document.createElement('button')

  deleteBtn.setAttribute('id', 'delete-todo')
  deleteBtn.textContent = 'Delete'

  deleteBtn.addEventListener('click', () => {
    const deleteEle = document.getElementById(todo.id)
    deleteEle.remove()

    todos = todos.filter(item => {
      return todo.id !== item.id
    })
    updateData()
  })

  return deleteBtn
}

const createPriorityList = (todo) => {
  const priorityList = document.createElement('select') // rename to priorityList
  // createPriorityList
  priorityList.setAttribute('id', 'select')
  // Create array of options to be added
  const prority = ['Select', 'High', 'Medium', 'Low']

  // Create and append the options
  for (let i = 0; i < prority.length; i++) {
    const option = document.createElement('option')
    option.value = prority[i]
    option.text = prority[i]
    priorityList.appendChild(option)
  }

  todo.prority ? priorityList.value = todo.prority : priorityList.value = 'Select'

  priorityList.addEventListener('change', (event) => {
    todo.prority = event.target.value
    updateData()
  })

  return priorityList
}

const createPriorityLabel = (todo) => {
  const priorityLabel = document.createElement('label')
  priorityLabel.textContent = 'Priority  '
  priorityLabel.appendChild(createPriorityList(todo))

  return priorityLabel
}

const createDueDateLabel = (todo) => {
  const dueDateLabel = document.createElement('label')
  dueDateLabel.textContent = 'DueDate  '
  dueDateLabel.appendChild(createDateTime(todo))

  return dueDateLabel
}

const createEditLabel = (todo) => {
  const editLabelDiv = document.createElement('div')
  editLabelDiv.setAttribute('id', 'edit-label')

  editLabelDiv.appendChild(createPriorityLabel(todo))
  editLabelDiv.appendChild(createDueDateLabel(todo))
  editLabelDiv.appendChild(createDeleteBtn(todo))

  return editLabelDiv
}

const createDivItem = (todo) => {
  const editItemDiv = document.createElement('div')

  editItemDiv.setAttribute('class', 'edit-item')
  editItemDiv.style.display = 'none'
  editItemDiv.appendChild(createTextArea(todo))
  editItemDiv.appendChild(createEditLabel(todo))

  return editItemDiv
}

const createEditItem = (todo) => {
  const todoItem = document.getElementById(`${todo.id}`)
  todoItem.appendChild(createDivItem(todo))
}

// Dispaly todos
const displayTodos = (todo) => {
  // todos.find(todo => {
  const todoList = document.querySelector('#todo-list')
  todoList.appendChild(createTodoItem(todo))
  createEditItem(todo)
  // })
}

// create unique id
const getId = () => {
  let count = 0

  const setCount = () => {
    todos = JSON.parse(read())
    console.log('getCount', todos)
    if (todos) {
      // check count = first
      count = todos[todos.length - 1].id ? todos[todos.length - 1].id : 0
      // todos[todos.length - 1].id ? count = todos[todos.length - 1].id : count = 0
    }
    console.log('getCount', count)
    return Number(count)
  }

  return setCount
}

// Create todo
const createTodo = (todoText) => {
  const count = getId()
  let id = count()

  console.log('id: ', id)
  const todo = { id: ++id, todoText }
  todos.push(todo)
  displayTodos(todo)// pass todo object
  updateData()
}

const create = () => {
  const submitBtn = document.forms['add-todo']

  // Submit todo header text
  submitBtn.addEventListener('submit', (event) => {
    event.preventDefault()
    const todoText = document.querySelector('#todoText')
    if (todoText.value.trim()) {
      createTodo(todoText.value.trim())
    }
    todoText.value = ''
  })
}

const app = () => {
  console.log('app todos', JSON.parse(read()))
  todos = JSON.parse(read())
  if (todos) {
    todos.forEach(todo => {
      displayTodos(todo)
    })
  } else {
    updateData()
  }
  create()
}

// app
app()
