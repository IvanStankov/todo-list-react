import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";

import uuid from "uuid";
import axios from "axios";

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get("http://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => this.setState({
        todos: res.data
      }))
      .catch(err => console.error(err));
  }

  markCompleted = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (id === todo.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  }

  deleteTodo = (id) => {    
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => {
        this.setState({
          todos: this.state.todos.filter(todo => id !== todo.id)
        });
      })
      .catch(err => console.error(err));
  }

  addTodo = (title) => {
    const newTodo = {
      title,
      completed: false
    };
    axios.post("http://jsonplaceholder.typicode.com/todos", newTodo)
      .then(res => {
        this.setState({
          todos: [...this.state.todos, res.data]
        });  
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markCompleted={this.markCompleted} deleteTodo={this.deleteTodo} />
                </React.Fragment>
              )} 
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
