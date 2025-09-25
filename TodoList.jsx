import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState("");
  const [listInputs, setListInputs] = useState({});

  // Add heading
  const handleAddTodo = () => {
    if (headingInput.trim() !== "") {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput("");
    }
  };
  
  // Delete heading
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Track input for list items under each heading
  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
  };

  // Add list item to a heading
  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== "") {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInputs[index]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [index]: "" });
    }
  };

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>

      {/* Input for heading */}
      <div className="input-container">
      <input
      type="text"
      className="heading-input" //Css class for styling
      placeholder="Enter heading" //Text shown when input is empty
      value={headingInput} //Value of the input field
      onChange={(e) => setHeadingInput(e.target.value)} //Add onChange event handler to update heading input state

    />
    <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>

      </div>

      {/* Display todo headings */}
      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            {/*display the heading of the current todo item*/}
            <h3>{todo.heading}</h3>
            {/*button to delete the current heading by passing its index to the handleDeleteTodo function*/}
            <button
              className="delete-button-heading"
              onClick={() => handleDeleteTodo(index)}
            >
              Delete Heading
            </button>

            {/* Display list items */}
            <ul>
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex}>
                  <p>{list}</p>
                </li>
              ))}
            </ul>

            {/* Input for adding list under heading */}
            <div className="add_list">
              <input
                type="text"
                placeholder="Add List"
                value={listInputs[index] || ""}
                onChange={(e) => handleListInputChange(index, e.target.value)}
              />
              <button onClick={() => handleAddList(index)}>Add List</button>
            </div>
          </div>

              

        ))}
      </div>
    </div>
  );
};

export default TodoList;
