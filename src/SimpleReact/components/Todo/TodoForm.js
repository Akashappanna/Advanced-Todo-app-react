import React, { useState } from "react";

const TodoForm = (props) => {
  const [title, setTitle] = useState(
    props.todoData ? props.todoData.title : ""
  );
  const [descrp, setDescrp] = useState(
    props.todoData ? props.todoData.descrp : ""
  );

  //input handlers
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const descrpHandler = (e) => {
    setDescrp(e.target.value);
  };

  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (props.isEdit) {
      props.onEdit({ id: props.todoData.id, title: title, descrp: descrp });
      return;
    }
    props.onSubmitTodo({
      id: Math.floor(Math.random() * 10000),
      title: title,
      descrp: descrp,
    });
    setTitle("");
    setDescrp("");
  };

  return (
    <React.Fragment>
      {props.isEdit && (
        <form onSubmit={submitHandler} className="edit-todo-form">
          <div>
            <label htmlFor="title">Title : </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={titleHandler}
            />
          </div>

          <div className="">
            <label htmlFor="description">Description : &nbsp; &nbsp;</label>
            <textarea
              type="text"
              id="description"
              value={descrp}
              onChange={descrpHandler}
              placeholder="Ex. walk a dog"
            ></textarea>
          </div>

          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      )}
      {!props.isEdit && (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="title">Title : </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={titleHandler}
              style={{ backgroundColor: "#d2c0ffcf" }}
            />
          </div>

          <div className="flex-container">
            <label htmlFor="description">Description : &nbsp; &nbsp;</label>
            <textarea
              type="text"
              id="description"
              value={descrp}
              onChange={descrpHandler}
              placeholder="Ex. walk a dog"
            ></textarea>
          </div>

          <div>
            <button type="submit">Add Todo</button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default TodoForm;
