import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddToDo';

// Main component to manage the list of todos
const TodoList = () => {
    // State to store the list of todos
    const [todos, setTodos] = useState([]);

    // Fetch todos from the server when the component mounts
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todos/')
            .then(res => setTodos(res.data)) // Update state with fetched todos
            .catch(err => console.error(err)); // Log errors to the console
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Function to handle adding a new todo
    const handleNewTodo = (newTodo) => {
        setTodos([newTodo, ...todos]); // Prepend the new todo to the list
    };

    // Function to handle updating an existing todo
    const handleUpdateTodo = (updatedTodo) => {
        // Map over todos and replace the updated todo by matching id
        const updatedTodos = todos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(updatedTodos); // Update the state with the new list
    };

    // Function to handle deleting a todo
    const handleDeleteTodo = (id) => {
        // Filter out the todo with the given id
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos); // Update the state with the filtered list
    };

    return (
        <div>
            <h1>Todo App</h1>
            {/* Component to add new todos */}
            <AddTodo onNewTodo={handleNewTodo} />
            {/* Render the list of todos using TodoItem component */}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id} // Unique key for each todo item
                    todo={todo}
                    onUpdate={handleUpdateTodo} // Pass update handler
                    onDelete={handleDeleteTodo} // Pass delete handler
                />
            ))}
        </div>
    );
};

export default TodoList;
