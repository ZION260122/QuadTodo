import { useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  
  return (
    <>
     <h1 className="text-4xl font-bold text-center my-8">Todo App</h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App