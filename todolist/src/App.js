
import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  
  //state stuff
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])

  //run once
  useEffect(() => {
    getLocalTodos()
  }, [])
  //use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])
  //functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => !todo.completed))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }
//save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
    }
    
  

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]))
    }
    else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal)
    }

  }
  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form inputText = {inputText} todos={todos} setTodos={setTodos} setInputText = {setInputText} setStatus={setStatus}/>
      <TodoList setTodos={setTodos} todos={todos} filteredTodos = {filteredTodos}/>
    </div>
  );
}

export default App;
