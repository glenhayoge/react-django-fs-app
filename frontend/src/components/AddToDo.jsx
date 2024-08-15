import React, { useState } from 'react';
import axios from 'axios';

// Component to handle adding a new todo item
const AddTodo = ({ onNewTodo }) => {
    // State to keep track of the input value for the new todo title
    const [title, setTitle] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create a new todo object with the current title and a default completed status of false
        const newTodo = { title, completed: false };

        // Send a POST request to the server to add the new todo
        axios.post('http://127.0.0.1:8000/api/todos/', newTodo)
            .then(res => {
                // Pass the newly created todo back to the parent component
                onNewTodo(res.data);
                // Clear the input field
                setTitle('');
            })
            .catch(err => console.error(err)); // Log any errors to the console
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update the title state when the input changes
                placeholder="Title"
                required // Make the input field required
            />
            <button type="submit">Add Todo</button> {/* Button to submit the form */}
        </form>
    );
};

export default AddTodo;