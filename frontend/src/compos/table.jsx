import React, { useState } from 'react'
import axios from 'axios'
import { MdEditDocument, MdDeleteOutline, } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { RxSwitch } from "react-icons/rx";


const Table = ({ todos, setTodos, isLoading }) => {

    const [editTask, setEditTask] = useState({
        'name': ''
    })


    //  for delete
    const handleDelete = async (id) => {
        try{
          await axios.delete(`http://127.0.0.1:8000/api/tasque/${id}/`)
          const newList = todos.filter(todo => todo.id !== id)
          setTodos(newList)

        } catch (error) {
          console.log(error);
        }
      }


    //   for edit
      const handleEdit = async (id, value) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/tasque/${id}/`, value)
            const newTasks = todos.map(todos => todos.id === id ? response.data : todos)
            setTodos(newTasks)

        } catch (error) {
            console.log(error);
          }
      }


    //   for switch
      const handleCheckbox = (id, value) => {
        handleEdit(id, {
            'completed': !value
        })
      }
    
    //   for change
    const changeHandler = (i) => {
        setEditTask( prev => ({
            ...prev,
            'name': i.target.value
        }))
    }


    const clickHandler = () => {
        handleEdit(editTask.id, editTask)
        setEditTask({
            'body': ''
        })
    }



    return (

        <div className='py-4'>
            <table className='w-11/12 max-w-4xl'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Task</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Created</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? <div>is loading</div> :
                        <> {todos.map((todoItem, index) => (
                            <tr key={todoItem.id} className='border-b border-black'>
                                <td title={todoItem.id} className="p-3">
                                    <span onClick={ () => handleCheckbox(todoItem.id, todoItem.completed)} className='inline-block cursor-pointer'>{todoItem.completed ? < IoMdCheckboxOutline /> : < RxSwitch /> }</span>
                                </td>
                                <td className='p-3 text-sm'>{todoItem.name}</td>
                                <td className='p-3 text-sm '>
                                    <span className={todoItem.completed ? 'text-xs text-white p-1.5 font-medium tracking-wider rounded-md bg-green-500' : 'text-xs text-white p-1.5 font-medium tracking-wider rounded-md bg-red-500' }> 
                                    {todoItem.completed ? 'Done' : 'incomplete' } </span>
                                </td>
                                <td className='p-3 text-sm'>{new Date(todoItem.created).toLocaleString()}</td>
                                <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5'>
                                    <span className='text-xl cursor-pointer'>
                                        <label htmlFor="my_modal_6" className="btn"><MdEditDocument onClick={ () => setEditTask(todoItem)} /></label>
                                    </span>
                                    <span className='text-xl cursor-pointer'> <MdDeleteOutline onClick={ () => handleDelete(todoItem.id)} /></span>
                                </td>
                            </tr>
                        )
                        )}</>}

                </tbody>
            </table>

                <input type="checkbox" id="my_modal_6" className=" modal-toggle" />
                <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit this task?</h3>
                    <input type="text" value={editTask.name} onChange={changeHandler} className="mt-6 input input-bordered input-warning w-full max-w-xs" />
                    <div className="modal-action">
                    <label htmlFor="my_modal_6" onClick={clickHandler} className="btn">Yes!</label>
                    <label htmlFor="my_modal_6" className="btn">No, go back!</label>
                    </div>
                </div>
                </div>

        </div>
    )
}

export default Table
