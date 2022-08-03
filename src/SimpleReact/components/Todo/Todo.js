import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
//css
import "./Todo.css";

const Todo = (props) => {
  //add todo state
  const [todos, setTodos] = useState([]);
  const [backupTodo, setBackupTodo] = useState([]);
  const [error, setError] = useState(null);

  //add todo handler
  const addTodoHandler = (todo) => {
    if (todo.title === "") {
      return console.log("input is empty");
    }
    todo.status = "Todo";
    todo.isView = false;
    todo.userId = props.userId;
    const newTodo = [...backupTodo, todo];
    setTodos(newTodo);
    setBackupTodo(newTodo);
  };

  //delete todo handler
  const deleteTodoHandler = (todoId) => {
    const deleteTodo = backupTodo.filter((todo) => todo.id !== todoId);
    setTodos(deleteTodo);
    setBackupTodo(deleteTodo);
  };

  //view todo Handler
  const viewTodoHandler = (id) => {
    const updatedTodo = backupTodo.map((todo) => {
      if (todo.id === id) {
        todo.isView = !todo.isView;
      }
      return todo;
    });
    setTodos(updatedTodo);
    setBackupTodo(updatedTodo);
  };

  //change status
  const statusChangeHandler = (todoId) => {
    const newUpdate = backupTodo.map((todo) => {
      if (todo.id === todoId) {
        if (todo.status === "Todo" || todo.status === "Done") {
          todo.status = "InProgress";
        } else if (todo.status === "InProgress") {
          todo.status = "Done";
        }
      }
      return todo;
    });
    setTodos(newUpdate);
    setBackupTodo(backupTodo);
  };

  //edit todo handler
  const editTodoHandler = (todoValue) => {
    const editTodo = backupTodo.map((todo) => {
      if (todo.id === todoValue.id) {
        if (todoValue.title === "") {
          return todo;
        }
        todo.title = todoValue.title;
        todo.descrp = todoValue.descrp;
      }
      return todo;
    });
    setTodos(editTodo);
    setBackupTodo(backupTodo);
  };

  const filterTodoHandler = (filterKey, filterState) => {
    if (filterKey === "title" && !filterState) {
      const filterList = todos.map((todo) => todo.title);
      const filterData = filterList.sort().map((newTodo) =>
        todos.filter((todo) => {
          if (todo.title === newTodo) {
            return todo;
          }
        })
      );
      const filterTodo = filterData.map((fData) => fData[0]);
      setTodos(filterTodo);
      return;
    }
    if (filterKey === "title" && filterState) {
      const filterList = todos.map((todo) => todo.title);
      const filterData = filterList.reverse().map((newTodo) =>
        todos.filter((todo) => {
          if (todo.title === newTodo) {
            return todo;
          }
        })
      );
      const filterTodo = filterData.map((fData) => fData[0]);
      setTodos(filterTodo);
    }

    if (filterState === "status") {
      const selectedTodo = backupTodo.filter(
        (todo) => todo.status === filterKey
      );
      if (selectedTodo.length === 0) {
        setError(`no todo found with status '${filterKey}'`);
        selectedTodo.push({});
        setTodos(selectedTodo);
        return;
      }
      setError(null);
      console.log(selectedTodo);
      setTodos(selectedTodo);
    }

    if (filterKey === "clear") {
      setError(null);
      setTodos(backupTodo);
    }
  };

  // const handleDragEnd = (e) => {
  //   if (!e.destination) return;
  //   let tempData = Array.from(todos);
  //   let [source_data] = tempData.splice(e.source.index, 1);
  //   tempData.splice(e.destination.index, 0, source_data);
  //   setTodos(tempData);
  // };

  console.log(todos);

  return (
    <div>
      <h1>Todo</h1>
      <TodoForm onSubmitTodo={addTodoHandler} />

      <TodoList
        todos={todos}
        error={error}
        onDelete={deleteTodoHandler}
        onViewTodo={viewTodoHandler}
        onStatus={statusChangeHandler}
        onEdit={editTodoHandler}
        onFilter={filterTodoHandler}
        // handleDragEnd={handleDragEnd}
      />
    </div>
  );
};

export default Todo;
