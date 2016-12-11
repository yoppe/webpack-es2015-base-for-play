import _ from 'lodash'
import $ from 'jquery'

class TodoView {

  static template(todo) {
    return `<li class="todo" data-id="${todo.id}" data-content="${todo.content}">
              <input type="checkbox" ${(todo.checked) ? 'checked' : ''}>
              <span>${todo.content}</span>
              <a href="#" class="close">x</a>
            </li>`
  }
}

const ENTER_KEY = 13

export default class TodoListView {

  constructor(model) {
    this.model = model
    this.$todoList = $('.todoList')

    const $todos = $('.todo')
    const $todoForm = $('.todoForm')
    const $clear = $('.clear')

    _.forEach($todos, todo => {
      const $todo = $(todo)
      this.model.pushTodoList({
        id: $todo.data('id'),
        content: $todo.data('content'),
        checked: $todo.find('input').prop('checked')
      })
    })

    const callbacks = {
      clear: e => {
        this.model.clearTodoList()
        this.render()
      },
      add: e => {
        if (e.which !== ENTER_KEY || _.isEmpty(e.target.value)) return

        this.model.pushTodoList({
          id: _.random(0, 100000),
          content: e.target.value,
          checked: false
        })
        $todoForm.val('')
        this.render()
      },
      check: e => {
        let $target = $(e.currentTarget)
        this.model.updateTodoChecked($target.parent('.todo').data('id'), $target.prop('checked'))
        this.render()
      },
      delete: e => {
        let $target = $(e.currentTarget).parent('.todo')
        this.model.deleteTodo($target.data('id'))
        this.render()
      }
    }

    this.$todoList
      .on('change', 'input', callbacks.check)
      .on('click', '.close', callbacks.delete)
    $clear.on('click', callbacks.clear)
    $todoForm.on('keyup', callbacks.add)
  }

  render() {
    const todoHTML = _.map(this.model.props.todoList, todo => TodoView.template(todo)).join('')
    this.$todoList.html(todoHTML)
  }
}
