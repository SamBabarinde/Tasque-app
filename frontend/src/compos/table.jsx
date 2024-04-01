import React from 'react'
import { MdEditDocument, MdDeleteOutline, } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
// import { RxSwitch } from "react-icons/rx";


const Table = ({todos, setTodos, isLoading}) => {



    
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
                <> 
                {todos.map((todoItem, index) => {
                    return (
                <tr>
                    <td className='p-3 '> 
                    <span className='inline-block cursor-pointer'> < IoMdCheckboxOutline /> </span>
                    </td>
                    <td className='p-3 text-sm'>lorem ipsum dolor</td>
                    <td className='p-3 text-sm '>
                    <span className='text-xs p-1.5 font-medium tracking-wider rounded-md bg-green-500'> Done</span>
                    </td>
                    <td className='p-3 text-sm'>24.01.24</td>
                    <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5'>
                        <span className='text-xl cursor-pointer'> <MdEditDocument /></span>
                        <span className='text-xl cursor-pointer'> <MdDeleteOutline /></span>
                    </td>
                </tr>
                )
                })
            }</>}
                
            </tbody>
        </table>
      </div>
  )
}

export default Table
