import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import loading from "../../assets/loading.gif";
import useHttp from "../../hooks/useHttp";
//css
import "./Todo.css";

const Todo = (props) => {
  //hooks
  const { sendRequest } = useHttp();

  //add todo state
  const [todos, setTodos] = useState([]);
  const [backupTodo, setBackupTodo] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchTodo = (data) => {
      if (data) {
        setTodos(data);
        setBackupTodo(data);
      }
      setIsLoading(false);
    };

    sendRequest({}, fetchTodo);
  }, []);

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
    sendRequest(
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: newTodo,
      },
      () => {}
    );
  };

  //delete todo handler
  const deleteTodoHandler = (todoId) => {
    // const todoIndex = backupTodo.findIndex((todo) => todo.id === todoId);
    const deleteTodo = backupTodo.filter((todo) => todo.id !== todoId);
    sendRequest(
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: deleteTodo,
      },
      () => {}
    );
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

    sendRequest(
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: newUpdate,
      },
      () => {}
    );
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

    const newEdit = editTodo.map((editItem) => {
      return { ...editItem };
    });

    newEdit.map((item) => {
      if (item.id === todoValue.id) {
        item.isView = false;
        return item;
      }
    });
    sendRequest(
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: newEdit,
      },
      () => {}
    );
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

  console.log(todos);

  return (
    <div>
      <h1>Todo</h1>
      <TodoForm onSubmitTodo={addTodoHandler} />
      {isLoading && <img src={loading} alt="loading" className="loading" />}
      {!isLoading && (
        <TodoList
          todos={todos}
          error={error}
          onDelete={deleteTodoHandler}
          onViewTodo={viewTodoHandler}
          onStatus={statusChangeHandler}
          onEdit={editTodoHandler}
          onFilter={filterTodoHandler}
        />
      )}
    </div>
  );
};

export default Todo;
