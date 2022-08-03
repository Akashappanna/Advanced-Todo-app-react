import React from "react";
import Filter from "./Filter";
import TodoItems from "./TodoItems";
import { DragDropContext } from "react-beautiful-dnd";

const TodoList = (props) => {
  return (
    <React.Fragment>
      {props.todos.length === 0 && props.error === null && (
        <h4>no todo found</h4>
      )}
      {props.todos.length > 0 && (
        <div className="todo-container todolist">
          <h3>TodoList</h3>
          <Filter onFilter={props.onFilter} />
          {props.error !== null && <h4>{props.error} </h4>}
          {props.error === null && (
            <ul>
              {props.todos.map((todo, index) => (
                <TodoItems
                  key={todo.id}
                  index={index}
                  id={todo.id}
                  todo={todo}
                  title={todo.title}
                  userId={todo.userId}
                  descrp={todo.descrp}
                  status={todo.status}
                  onDelete={props.onDelete}
                  onViewTodo={props.onViewTodo}
                  onStatus={props.onStatus}
                  onEdit={props.onEdit}
                  onFilter={props.onFilter}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default TodoList;
