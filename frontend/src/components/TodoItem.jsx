import React from 'react';
import axios from 'axios';


const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const handleCheckboxChange = () => {
        const updatedTodo = { ...todo, completed: !todo.completed };

        // Send a PUT request to update the todo on the server
        axios.put(`http://127.0.0.1:8000/api/todos/${todo.id}/`, updatedTodo)
            .then(res => {
                onUpdate(res.data); // Notify the parent component of the update
            })
            .catch(err => console.error(err));
    };

    const handleDelete = () => {
        // Send a DELETE request to delete the todo from the server
        axios.delete(`http://127.0.0.1:8000/api/todos/${todo.id}/`)
            .then(() => {
                onDelete(todo.id); // Notify the parent component of the deletion
            })
            .catch(err => console.error(err));
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <h3>{todo.title}</h3>
            <div class="right-todo">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheckboxChange}
            />
            <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;