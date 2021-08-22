import React, { Component } from "react";
import { Redirect } from "react-router";
import { UncontrolledAlert } from "reactstrap";

import TodoModal from "../components/TodoModal";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  async refreshList() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/todos/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({ todoList: data });
      }
    } catch (error) {
      // alert('Network connection error. Please try again!');
      this.setState({ alert: true });
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  async handleSubmit(item) {
    //console.log('this = ', this)
    //console.log('item = ', item)
    this.toggle();
    try {
      if (item.id) {
        await fetch(`http://127.0.0.1:8000/api/todos/${item.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Token " + localStorage.getItem("token"),
          },
          body: JSON.stringify(item),
        });
        return this.refreshList();
      }

      await fetch("http://127.0.0.1:8000/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(item),
      });
      return this.refreshList();
    } catch (error) {
      this.setState({ alert: true });
    }
  }

  async handleDelete(item) {
    try {
      await fetch(`http://127.0.0.1:8000/api/todos/${item.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      return this.refreshList();
    } catch (error) {
      this.setState({ alert: true });
    }
  }

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            View/Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/login" />;
    }

    return (
      <main className="container">
        <br></br>
        {this.state.alert ? (
          <UncontrolledAlert color="danger">
            Cannot connect to the server!
          </UncontrolledAlert>
        ) : null}
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary" onClick={this.createItem}>
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <TodoModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default Todo;
