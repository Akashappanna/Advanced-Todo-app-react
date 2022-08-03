import React, { useState } from "react";

const ReferenceTodo = () => {
  const [data, setData] = useState([
    { id: "1", isView: false },
    { id: "2", isView: false },
    { id: "3", isView: false },
    { id: "4", isView: false },
  ]);

  const [newData, setNewData] = useState({ id: "n1", isView: false });
  const a = data.map((items) => {
    return { ...items };
  });
  a[0].isView = true;
  a[2].isView = true;
  console.log(data);
  console.log(a);

  const n = { ...newData };
  n.isView = true;
  console.log(newData);
  console.log(n);

  return <div>ReferenceTodo</div>;
};

export default ReferenceTodo;
