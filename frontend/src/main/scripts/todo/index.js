import $ from 'jquery'

import TodoListView from 'todo/view.js'
import TodoListModel from 'todo/model.js'

$(() => {
  const todoList = new TodoListModel()
  new TodoListView(todoList)
})
