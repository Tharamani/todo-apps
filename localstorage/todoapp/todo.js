
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

const createItem = (todo) => {
  console.log('createItem ', todo)
  const inputText = document.createElement('input')
  const inputCheckbox = document.createElement('input')
  const todoItem = document.createElement('div') // rename to todoItem

  inputText.setAttribute('class', 'todo-text') // remove id attr, set class attr
  inputText.setAttribute('type', 'text')
  inputText.value = todo.todoText

  inputCheckbox.setAttribute('class', 'checkbox')// remove id attr, set class attr
  inputCheckbox.setAttribute('type', 'checkbox')
  inputCheckbox.checked = todo.isChecked

  todoItem.setAttribute('id', todo.id)
  todoItem.setAttribute('class', 'todo-item')
  todoItem.appendChild(inputCheckbox)
  todoItem.appendChild(inputText)

  // if (todo.isChecked) {
  //   inputText.style.textDecoration = 'line-through'
  //   inputText.style.background = '#c38181'
  // }

  // Event listeners
  inputText.addEventListener('click', () => {
    const editItem = todoItem.querySelector('.edit-item')
    editItem.style.display === 'block' ? editItem.style.display = 'none' : editItem.style.display = 'block'
  })

  inputText.addEventListener('change', (event) => {
    todo.todoText = event.target.value
    updateData()
  })

  inputCheckbox.addEventListener('change', () => {
    todo.isChecked = inputCheckbox.checked
    updateData()
    // if (todo.isChecked) {
    //   inputText.style.textDecoration = 'line-through'
    //   inputText.style.background = '#c38181'
    // } else {
    //   inputText.style.textDecoration = ''
    //   inputText.style.background = ''
    // }
  })

  return todoItem
}

const createEditItem = (todo) => {
  const textArea = document.createElement('textarea')
  const priorityList = document.createElement('select')
  const inputDateTime = document.createElement('input')
  const deleteBtn = document.createElement('button')
  const editItemDiv = document.createElement('div')
  const editLabelDiv = document.createElement('div')
  const priorityLabel = document.createElement('label')
  const dueDateLabel = document.createElement('label')

  priorityLabel.textContent = 'Priority  '
  dueDateLabel.textContent = 'DueDate  '

  textArea.setAttribute('class', 'text-area') // remove id, add class
  textArea.setAttribute('placeholder', 'Notes')
  todo.todoNote ? textArea.value = todo.todoNote : textArea.value = ''
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

  inputDateTime.setAttribute('id', 'date-time')
  inputDateTime.setAttribute('type', 'datetime-local')
  inputDateTime.setAttribute('value', todo.dueDate)

  todo.prority ? priorityList.value = todo.prority : priorityList.value = 'Select'
  editItemDiv.setAttribute('class', 'edit-item')
  editItemDiv.style.display = 'none'
  deleteBtn.setAttribute('id', 'delete-todo')
  deleteBtn.textContent = 'Delete'

  editLabelDiv.setAttribute('id', 'edit-label')
  editLabelDiv.appendChild(priorityLabel)// priorityLabel
  editLabelDiv.appendChild(dueDateLabel)
  editLabelDiv.appendChild(deleteBtn)
  // textAreaLabel.appendChild(textArea)
  priorityLabel.appendChild(priorityList) // priorityList
  dueDateLabel.appendChild(inputDateTime)

  editItemDiv.appendChild(textArea)
  editItemDiv.appendChild(editLabelDiv)

  const item = document.getElementById(`${todo.id}`)
  item.appendChild(editItemDiv)

  textArea.addEventListener('change', (event) => {
    todo.todoNote = event.target.value
    updateData()
  })

  inputDateTime.addEventListener('change', (event) => {
    todo.dueDate = event.target.value
    updateData()
  })

  priorityList.addEventListener('change', (event) => {
    todo.prority = event.target.value
    updateData()
  })

  deleteBtn.addEventListener('click', () => {
    const deleteEle = document.getElementById(todo.id)
    deleteEle.remove()

    todos = todos.filter(item => {
      return todo.id !== item.id
    })
    updateData()
  })
}

// Dispaly todos
const displayTodos = (todo) => {
  // todos.find(todo => {
  const list = document.querySelector('#todo-list')
  list.appendChild(createItem(todo))
  createEditItem(todo)
  // })

  // todos.forEach(todo => {
  //   if (todoId) { // array.find()
  //     const list = document.querySelector('#todo-list')
  //     list.appendChild(createItem(todoId, todo))
  //     createEditItem(todo)
  //   }
  // })
}

const getId = () => {
  let count = 0

  const setCount = () => {
    todos = JSON.parse(read())
    console.log('getCount', todos)
    if (todos.length > 0) {
      // check count = first
      count = todos[todos.length - 1].id ? count = todos[todos.length - 1].id : count = 0
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
  console.log('read', read())
  if (read() === null) {
    updateData()
  } else {
    todos = JSON.parse(read())
    if (todos.length > 0) {
      todos.forEach(todo => {
        displayTodos(todo)
      })
    }
  }
  create()
}

// app
app()
