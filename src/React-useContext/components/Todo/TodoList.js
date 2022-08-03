import React, { useContext } from "react";
import TodoAppContext from "../../todo-context/TodoContext";
import Filter from "./Filter";
import TodoItems from "./TodoItems";

const TodoList = (props) => {
  const ctx = useContext(TodoAppContext);

  return (
    <React.Fragment>
      {ctx.todos.length === 0 && ctx.error === null && <h4>no todo found</h4>}
      {ctx.todos.length > 0 && (
        <div className="todo-container todolist">
          <h3>TodoList</h3>
          <Filter onFilter={ctx.onFilter} />
          {ctx.error !== null && <h4>{ctx.error} </h4>}
          {ctx.error === null && (
            <ul>
              {ctx.todos.map((todo, index) => (
                <TodoItems
                  key={todo.id}
                  index={index}
                  id={todo.id}
                  todo={todo}
                  title={todo.title}
                  userId={todo.userId}
                  descrp={todo.descrp}
                  status={todo.status}
                  onDelete={ctx.onDelete}
                  onViewTodo={ctx.onViewTodo}
                  onStatus={ctx.onStatus}
                  onEdit={ctx.onEdit}
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
