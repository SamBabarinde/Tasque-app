import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Form from './compos/form'
import Table from './compos/table'


function App() {
  const [todos, setTodos] = useState("")
  const [isLoading, setisLoading] = useState(true)

  useEffect( () => {
    fetchData()
    console.log(todos);
  }, [])

const fetchData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/tasque/")
    setTodos(response.data)
    setisLoading(false)
  } catch (error) {
    console.log(error);
  }
}

  return (

      <div className='bg-grey-100 px-8 min-h-screen'>
        <nav className='pt-8'>
          <h3 className='text-3xl text-center pb-12'>Tasque App</h3>
        </nav>
        <Form
        fetchData={fetchData}
        setTodos={setTodos}
        />
        <Table
        todos={todos}
        setTodos={setTodos}
        isLoading={isLoading}
        />
      </div>
  )
}

export default App
