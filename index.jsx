import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let id = 0;

const Todo = props => (
  <li>
    <input type="checkbox" onChange={props.onToggle} />
    <span>{props.todo.text}</span>
    <button onClick={props.onDelete}>Delete</button>
  </li>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("What would you be doing today?");
    this.setState({
      todos: [...this.state.todos, { text, id: id++, checked: false }]
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => id !== todo.id)
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.addTodo()}>Add Todo</button>
        <p>All todos: {this.state.todos.length} </p>
        <p>
          Completed todos:{" "}
          {this.state.todos.filter(todo => todo.checked == true).length}{" "}
        </p>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              todo={todo}
              onDelete={() => this.deleteTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
