import './App.css'

import TodoList from './components/TodoList';

function App() {
  return (
    <>
      <div className="container">
            <h1>React ToDo App with Django Backend</h1>
            <TodoList />
        </div>
    </>
  )
}

export default App