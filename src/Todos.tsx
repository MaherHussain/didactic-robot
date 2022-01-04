import React, { useState } from "react";

export default function Todos() {
  const todosList = [
    { id: 1, title: "hello there", deadline: "", status: "" },
    { id: 2, title: "general kenobi", deadline: "", status: "" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-redeclare

  const [todos, setTodos] = useState(todosList);
  const [title, setTitle] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;
    const newTodo = {
      id: Math.random(),
      title: title,
      deadline: "",
      status: "",
    };
    setTodos(todos.concat(newTodo));
    setTitle("");
  };

  const removeTodo = (removeIndex: number) => {
    const removedItem = todos.filter((_, index) => index !== removeIndex);
    setTodos(removedItem);
  };
  const deadlineHandler = (e: { target: { value: any } }, id: number) => {
    const deadlineValue = e.target.value;

    const todoWithDeadline = todos.map((item) => {
      if (item.id === id) {
        item.deadline = deadlineValue;
      }
      return item;
    });

    setTodos(todoWithDeadline);
  };

  const onChange = (e: { target: { name: any; value: any } }, id: number) => {
    const { value } = e.target;

    const selectedTodo = todos.map((item) => {
      if (item.id === id) {
        item.status = value;
      }
      return item;
    });

    setTodos(selectedTodo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 1000,
        margin: "0 auto",
        padding: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Todo</h2>
      <form onSubmit={onSubmit} style={{ display: "flex", marginBottom: 8 }}>
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Fix the thing.."
          style={{
            display: "inline-flex",
            flex: 1,
            padding: 4,
            border: "1px solid #eaeaea",
            marginRight: 4,
          }}
        />
        <button
          type="submit"
          style={{ borderColor: "#eaeaea", backgroundColor: "#fff" }}
        >
          Add
        </button>
      </form>
      <div>
        {todos.length === 0 && (
          <div style={{ textAlign: "center" }}>Add some todos</div>
        )}

        {todos &&
          todos.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              style={{
                padding: 4,
                borderBottom: "1px solid #ccc",
                display: "flex",
              }}
            >
              <span style={{ flex: 1 }}>{item.title}</span>
              <span style={{ flex: 1 }}>{item.status}</span>
              <span style={{ flex: 1 }}>{item.deadline}</span>
              <div style={{ flex: 1 }}>
                todo
                <input
                  type="radio"
                  onChange={(e) => onChange(e, item.id)}
                  name={`${item.title}${item.id}`}
                  value="todo"
                />
                doing{" "}
                <input
                  type="radio"
                  onChange={(e) => onChange(e, item.id)}
                  name={`${item.title}${item.id}`}
                  value="doing"
                />
                    done
                <input
                  type="radio"
                  onChange={(e) => onChange(e, item.id)}
                  name={`${item.title}${item.id}`}
                  value="done"
                />
                 
              </div>

              <span style={{ cursor: "pointer" }} onClick={() => removeTodo(i)}>
                &times;
              </span>
              <span style={{ margin: "0 20px" }}>
                <input
                  type="date"
                  name={`${item.title}${item.id}`}
                  min={Date.now()}
                  max="2022-12-31"
                  onChange={(e) => deadlineHandler(e, item.id)}
                />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
