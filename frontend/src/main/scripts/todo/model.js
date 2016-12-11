import _ from 'lodash'

class TodoModel {

  constructor(todo = {}) {
    this.id = todo.id
    this.content = todo.content || ''
    this.checked = todo.checked || false
  }

  updateChecked(checked) {
    return _.merge(this, {checked: checked})
  }
}

export default class TodoListModel {
  constructor() {
    this.props = {
      todoList: []
    }
  }

  pushTodoList(todo) {
    this.props.todoList = _.concat(this.props.todoList, new TodoModel(todo))
  }

  clearTodoList() {
    this.props.todoList = []
  }

  updateTodoChecked(id, checked) {
    this.props.todoList = _.map(this.props.todoList, todo =>
      (todo.id === id) ? todo.updateChecked(checked) : todo
    )
  }

  deleteTodo(id) {
    _.remove(this.props.todoList, {id: id})
  }

}
