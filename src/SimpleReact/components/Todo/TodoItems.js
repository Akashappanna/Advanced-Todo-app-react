import React, { useState } from "react";
//icons
import { MdDragHandle } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import TodoForm from "./TodoForm";
import { Draggable, Droppable } from "react-beautiful-dnd";

const TodoItems = (props) => {
  //object destructuring
  const {
    id,
    index,
    title,
    descrp,
    userId,
    status,
    todo,
    onStatus,
    onDelete,
    onViewTodo,
    onEdit,
  } = props;

  const [isEdit, setIsEdit] = useState(false);

  //handler functions
  const deleteFunctionHandler = () => {
    onDelete(id);
  };
  const viewFunctionHandler = () => {
    onViewTodo(id);
  };
  const editHandler = () => {
    if (todo.isView === false) {
      onViewTodo(id);
    }
    setIsEdit(true);
  };
  const stopEditHandler = (todoValue) => {
    if (todoValue.id) {
      onEdit(todoValue);
    }
    setIsEdit(false);
  };
  const todoStatusChangeHandler = () => {
    onStatus(id);
  };

  let todoList;

  if (isEdit) {
    todoList = (
      <div className="todo-edit-section">
        <div className="todo-stopEdit">
          {isEdit && (
            <i>
              <MdEditOff onClick={stopEditHandler} />
            </i>
          )}
          <TodoForm
            isEdit={isEdit}
            todoData={{
              id: id,
              title: title,
              descrp: descrp,
            }}
            onEdit={stopEditHandler}
          />
        </div>
      </div>
    );
  }

  if (!isEdit) {
    todoList = (
      <div>
        <div className="todolist-container">
          <div className="todo-drag">
            <MdDragHandle />
          </div>
          <h3>{title.length > 4 ? title.slice(0, 4) + "..." : title}</h3>
          <p className={status === "Done" ? "todo-status" : ""}>
            status : {status}
          </p>
          <div className="todolist-button">
            <button type="button" onClick={todoStatusChangeHandler}>
              {status === "InProgress" ? "Stop Task" : "Start Task"}
            </button>
          </div>
          <div className="todo-icons">
            <BsFillEyeFill onClick={viewFunctionHandler} />
            {!isEdit && <MdModeEditOutline onClick={editHandler} />}
            <AiFillDelete onClick={deleteFunctionHandler} />
          </div>
        </div>
        <h3 className="todo-details">
          Title : <span className="todo-detail">{title}</span>
        </h3>
        <p className="todo-details">
          Description : <span className="todo-details-sub">{descrp}</span>
        </p>
        <p className="todo-details">UserId : {userId}</p>
      </div>
    );
  }

  return <li className={todo.isView ? "" : "todo-list-items"}>{todoList}</li>;
};

export default TodoItems;
