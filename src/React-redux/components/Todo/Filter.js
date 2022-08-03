import React, { useState } from "react";

let initialfilter = true;
let n = 0;
const Filter = (props) => {
  const [filter, setFilter] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  //filter handler
  const filterSortHandler = () => {
    props.onFilter("title", filter);
    setFilter((prevState) => (prevState = !prevState));
  };

  const selectValueHandler = (e) => {
    if (initialfilter === true) {
      initialfilter = false;
      return;
    }
    setSelectValue(e.target.value);
    if (selectValue === e.target.value && n === 0) {
      n = 1;
      return;
    }
    n = 0;
    props.onFilter(e.target.value, "status");
  };

  const filterClearHandler = () => {
    props.onFilter("clear", true);
    setFilter((prevState) => (prevState = false));
  };
  return (
    <div className="filter-todo">
      <h4>Filters</h4>
      <button type="button" onClick={filterSortHandler}>
        Title ( ' {!filter ? "Asc" : "Desc"} ' )
      </button>

      <select className="filter-select" onClick={selectValueHandler}>
        <option vaule="Todo">Todo</option>
        <option vaule="InProgress">InProgress</option>
        <option vaule="Done">Done</option>
        select
      </select>
      <button type="button" onClick={filterClearHandler}>
        Clear Filter
      </button>
    </div>
  );
};

export default Filter;
