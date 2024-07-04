import React, { useState, useEffect } from 'react';
import './index.css';
import { MdDelete } from "react-icons/md";

const initialTodo=[
    {
        text:'Learn React.js',
        id:1,
    }
]

const TodoTask = () => {
  const [todos, setTodos] = useState(getTodoListFromLocalStorage(initialTodo[0]));
  const [todoText, setTodoText] = useState("");

  function getTodoListFromLocalStorage() {
    const stringifiedTodoList = localStorage.getItem("todoList");
    const parsedTodoList = JSON.parse(stringifiedTodoList);
    return parsedTodoList || [];
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const onAddTodoTask = () => {
    if (todoText.trim() === "") {
      alert("Enter Valid Text");
      return;
    }

    const newTodo = {
      text: todoText,
      uniqueNo: todos.length + 1,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const onTodoStatusChange = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const onDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className='create-task-container'>
        <h1 className='createTaskHeading'>Create Task</h1>
        <input
            type="text"
            id="todoUserInput"
            value={todoText}
            onChange={handleInputChange}
            placeholder='What needs to be done?'
            className='inputText'
        />
        <button id="addTodoButton" className='AddTodoButton' onClick={onAddTodoTask}>Add Todo</button>
      </div>
      <h1 className='createTaskHeading'>My Tasks</h1>
      <ul id="todoItemsContainer" className='todoItemsContainer'>
        {todos.map((todo, index) => (
          <li key={todo.uniqueNo} className="todo-item-container" id={`todo${todo.uniqueNo}`}>
            <input
              type="checkbox"
              id={`checkbox${todo.uniqueNo}`}
              className="checkbox-input"
              checked={todo.completed}
              onChange={() => onTodoStatusChange(index)}
            />
            <div className="label-container">
              <label
                htmlFor={`checkbox${todo.uniqueNo}`}
                id={`label${todo.uniqueNo}`}
                className={`checkbox-label ${todo.completed ? 'checked' : ''}`}
              >
                {todo.text}
              </label>
              <div className="delete-icon-container">
                <MdDelete onClick={() => onDeleteTodo(index)}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className='saveButton' id="saveTodoButton" onClick={() => localStorage.setItem("todoList", JSON.stringify(todos))}>Save Todos</button>
    </div>
  );
};

export default TodoTask;
