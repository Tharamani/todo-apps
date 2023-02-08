const note = document.querySelector('#note')
const submitBtn = document.forms['add-todo']
const list = document.querySelector('#todo-list')
// const item = document.querySelector('#todo-item')
const div = document.createElement('div')

const todos = []
let count = 0
const createTodo = (value) => {
  console.log('createTodo')
  const todo = { id: ++count, value }
  todos.push(todo)
  displayTodo(todo.id)
}

const updateTodo = (event) => {
  console.log('updatTodo : ', event)
}

let toggle = false
const displayTodo = (id) => {
  console.log('displayTodo', todos)
  const inputText = document.createElement('input')
  todos.forEach(todo => {
    console.log('displayTodo todo : ', todo)
    if (todo.id === id) {
      const inputCheckbox = document.createElement('input')
      const divElement = document.createElement('div')

      inputText.setAttribute('type', 'text')
      inputText.value = todo.value
      inputText.classList.add('todo')

      inputCheckbox.setAttribute('type', 'checkbox')
      divElement.setAttribute('class', 'todo-item')
      divElement.setAttribute('id', id)

      divElement.appendChild(inputCheckbox)
      divElement.appendChild(inputText)
      // item.appendChild(divElement)
      list.appendChild(divElement)
      inputText.addEventListener('click', (event) => {
        console.log('addEventListener : ', event)
        createDiv(event, todo.id, toggle, divElement.getAttribute('id'))
      })
    }
  })
}

const toggleOnClick = (layout) => {
  console.log('toggleOnClick')
  toggle = true
  if (div.style.display === 'block') {
    console.log('if block')
    // toggle = true
    div.style.display = 'none'
  } else {
    console.log('else none')
    div.style.display = 'block'
  }
}

const createDiv = (event, id, toggle, actualID) => {
  toggle = !toggle
  console.log('appendDiv', event.target.value, toggle)

  if (toggle) {
    console.log('toggle', event.target.value, toggle, id, actualID)
    const textArea = document.createElement('textarea')
    const selectList = document.createElement('select')
    const inputDateTime = document.createElement('input')

    textArea.setAttribute('id', 'text-area')
    textArea.value = event.target.value

    selectList.setAttribute('id', 'select')
    // Create array of options to be added
    const prority = ['High', 'Medium', 'Low']

    // Create and append the options
    for (let i = 0; i < prority.length; i++) {
      const option = document.createElement('option')
      option.value = prority[i]
      option.text = prority[i]
      selectList.appendChild(option)
    }

    inputDateTime.setAttribute('id', 'date-time')
    inputDateTime.setAttribute('type', 'datetime-local')
    inputDateTime.setAttribute('value', 'dd/mm/yyyy')
    div.setAttribute('class', 'edit-item')
    // div.style.display = 'block'
    div.appendChild(textArea)
    div.appendChild(selectList)
    div.appendChild(inputDateTime)
    const layout = document.getElementById(`${id}`)
    layout.appendChild(div)
  }
  toggleOnClick()
}

submitBtn.addEventListener('submit', (event) => {
  event.preventDefault()
  if (note.value.trim()) {
    createTodo(note.value.trim())
  }
  note.value = ''
})
