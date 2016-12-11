package application

import play.api.mvc._

class TodoController extends Controller {

  def index() = Action {
    Ok(views.html.todo("Todo List"))
  }

}
