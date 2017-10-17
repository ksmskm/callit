var React = require('React'),
  InputComponent = require('./input.jsx'),
  ListComponent = require('./list.jsx'),
  id = 0;

document.addEventListener('DOMContentLoaded', function() {
  var Todos = React.createClass({
    // We start with a couple of dummy todos as our default
    getDefaultProps: function() {
      return {
        todos: [
          this.createTodo('Go learn React JS'),
          this.createTodo('Stop using Backbone Views')
        ]
      };
    },
    // helper function to return a new todo object with incremented unique id
    createTodo: function(text) {
      id++;

      return {
        id: id,
        text: text
      };
    },
    // we add a new todo to the todos array, then force an update by
    // calling setProps on the new todos array
    handleTodoAdd: function(text) {
      this.setProps({
        todos: this.props.todos.concat(this.createTodo(text))
      });

      this.refs.input.clearInputValue();
    },
    // we filter out the removed todo item and force an update by
    // calling setProps on the new todos array
    handleTodoRemoved: function(todo) {
      this.setProps({
        todos: this.props.todos.filter(function(msg){
          return todo.id !== msg.id;
        })
      });
    },
    render: function() {
      return  (
        <div className="todos-container">
          <div className="input-container">
            <InputComponent ref="input" placeholder='Enter something...' onInputSubmit={this.handleTodoAdd}/>
          </div>
          <div className="list-container">
            <ListComponent ref="list" items={this.props.todos} onListItemSelected={this.handleTodoRemoved}/>
          </div>
        </div>
      );
    }
  });

  React.renderComponent(<Todos/>, document.body);
});