import React, { useState } from 'react'
import axios from 'axios'

const Form = ({fetchData, }) => {

  const [newTask, setNewTask] = useState({
    'name' : ''
  }) 

  const handleChange = (e) => {
    setNewTask(prev => ({
      ...prev,
      'name': e.target.value 
    }))
  }
  console.log(newTask);

  const createTask = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/tasque/', newTask)
      setNewTask({'name': ''})
      fetchData()
    } catch (error) {
      console.log(error);
    }
  }


  return (

      <div className=''>
       <input type="text" placeholder="Add task to queue" className="input input-bordered input-warning w-full max-w-xs" 
       onChange={handleChange} value={newTask.name}
       onKeyDown={(e) => {
        if (e.key === 'Enter') {
          createTask()
        }
       }}
       />
      <button onClick={createTask} className=" ml-2 btn btn-outline btn-warning">ADD TASK</button>
      </div>
  )
}

export default Form
