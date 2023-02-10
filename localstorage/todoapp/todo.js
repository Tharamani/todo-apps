const submitBtn = document.forms['add-todo']

let todos = []
let count = 0

const todosLStore = window.localStorage.getItem('todos')
console.log('todosLStore', todosLStore)

const updateTodo = () => window.localStorage.setItem('todos', JSON.stringify(todos))

const createTodo = (todoText) => {
  console.log('createTodo')
  const todo = { id: ++count, todoText }
  todos.push(todo)
  displayTodo(todo.id)
  updateTodo()
}

const displayTodo = (id) => {
  console.log('displayTodo', todos)

  const inputText = document.createElement('input')

  todos.forEach(todo => {
    console.log('displayTodo todo : ', todo)
    if (todo.id === id) {
      const list = document.querySelector('#todo-list')
      const inputCheckbox = document.createElement('input')
      const divElement = document.createElement('div')

      inputText.setAttribute('type', 'text')
      inputText.value = todo.todoText
      inputText.classList.add('todo')
      inputCheckbox.setAttribute('id', 'checkbox')
      inputCheckbox.setAttribute('type', 'checkbox')

      divElement.setAttribute('class', 'todo-item')
      divElement.setAttribute('id', id)

      divElement.appendChild(inputCheckbox)
      divElement.appendChild(inputText)
      list.appendChild(divElement)

      createDiv(todo)

      inputCheckbox.checked = todo.isChecked

      if (todo.isChecked) {
        console.log('todo.isChecked ', todo.isChecked, inputText)
        inputText.style.textDecoration = 'line-through'
        inputText.style.background = '#c38181'
      } else {
        inputText.style.textDecoration = ''
        inputText.style.background = ''
      }
      inputText.addEventListener('click', (event) => {
        console.log('addEventListener : ', event.target)
        const editItem = divElement.querySelector('.edit-item')
        if (editItem.style.display === 'block') {
          console.log('if block')
          editItem.style.display = 'none'
        } else {
          console.log('else none')
          editItem.style.display = 'block'
        }
      })

      inputText.addEventListener('change', (event) => {
        todo.todoText = event.target.value
        console.log('todo', todo)

        updateTodo(todo)
      })

      inputCheckbox.addEventListener('change', () => {
        todo.isChecked = inputCheckbox.checked
        console.log('todo', todo)
        updateTodo(todo)
        if (todo.isChecked) {
          console.log('todo.isChecked ', todo.isChecked, inputText)
          inputText.style.textDecoration = 'line-through'
          inputText.style.background = '#c38181'
        } else {
          inputText.style.textDecoration = ''
          inputText.style.background = ''
        }
      })
    }
  })
}

const createDiv = (todo) => {
  console.log('createDiv', todo)

  const textArea = document.createElement('textarea')
  const selectList = document.createElement('select')
  const inputDateTime = document.createElement('input')
  const deleteBtn = document.createElement('button')
  const div = document.createElement('div')

  // const textAreaLabel = document.createElement('label')
  // textAreaLabel.textContent = 'Note'
  const selectLabel = document.createElement('label')
  selectLabel.textContent = 'Priority'
  const dueDateLabel = document.createElement('label')
  dueDateLabel.textContent = 'DueDate'

  textArea.setAttribute('id', 'text-area')
  textArea.setAttribute('placeholder', 'Notes')
  todo.todoNote ? textArea.value = todo.todoNote : textArea.value = textArea.getAttribute('placeholder')

  selectList.setAttribute('id', 'select')
  // Create array of options to be added
  const prority = ['Select', 'High', 'Medium', 'Low']

  // Create and append the options
  for (let i = 0; i < prority.length; i++) {
    const option = document.createElement('option')
    option.value = prority[i]
    option.text = prority[i]
    selectList.appendChild(option)
  }

  inputDateTime.setAttribute('id', 'date-time')
  inputDateTime.setAttribute('type', 'datetime-local')
  inputDateTime.setAttribute('value', todo.dueDate)
  todo.prority ? selectList.value = todo.prority : selectList.value = 'Select'
  div.setAttribute('class', 'edit-item')
  div.style.display = 'none'
  deleteBtn.setAttribute('id', 'deleteTodo')
  deleteBtn.textContent = 'Delete'

  // textAreaLabel.appendChild(textArea)
  selectLabel.appendChild(selectList)
  dueDateLabel.appendChild(inputDateTime)

  div.appendChild(textArea)
  div.appendChild(selectLabel)
  div.appendChild(dueDateLabel)
  div.appendChild(deleteBtn)

  const layout = document.getElementById(`${todo.id}`)
  layout.appendChild(div)

  textArea.addEventListener('change', (event) => {
    todo.todoNote = event.target.value
    console.log('todo', todo.todoNote)
    updateTodo(todo)
  })
  inputDateTime.addEventListener('change', (event) => {
    todo.dueDate = event.target.value
    console.log('todo', todo)
    updateTodo(todo)
  })
  selectList.addEventListener('change', (event) => {
    todo.prority = event.target.value
    console.log('todo', todo)
    updateTodo(todo)
  })
  deleteBtn.addEventListener('click', (event) => {
    const deleteEle = document.getElementById(todo.id)
    console.log('deleteEle', deleteEle)
    deleteEle.remove()

    todos = todos.filter(item => {
      console.log('deleteEle', todo.id, item.id)
      return todo.id !== item.id
    })
    console.log('deleteEle', todos)
    updateTodo()
  })
}

if (todosLStore === null || todosLStore === []) {
  updateTodo()
} else {
  todos = JSON.parse(todosLStore)
  if (todos.length > 0) {
    console.log('todos intial :', todos, todos[todos.length - 1])
    todos[todos.length - 1].id ? count = todos[todos.length - 1].id : count = 0

    todos.forEach(todo => {
      displayTodo(todo.id)
    })
  } else {
    updateTodo()
  }
}

submitBtn.addEventListener('submit', (event) => {
  event.preventDefault()
  const todoText = document.querySelector('#todoText')
  if (todoText.value.trim()) {
    createTodo(todoText.value.trim())
  }
  todoText.value = ''
})
