import axios from 'axios';
import React from 'react'
import  { useState, useEffect } from 'react'
import Modal from './Modal';
import { useParams } from 'react-router-dom';

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [dueDate, setDueDate] = useState('')
    const [display, setDisplay] = useState([])
    const [showModal, setShowModal] = useState (false)
    const [selectedTodo, setSelectedTodo] = useState (null)
    const endpoint = 'http://localhost:5555/addTodo'
    const answer = 'http://localhost:5555/submittedTodo'
    const delete_url = 'http://localhost:5555/delete'
    const update_url = 'http://localhost:5555/update'
    const checkbox_url = 'http://localhost:555/toggle'


    const {userId} = useParams()
    const user = JSON.parse(localStorage.getItem('users'))
    const token = localStorage.getItem('token')
  

    const todoInfo = (e) =>{
        e.preventDefault()
        if (title === '' || description === '' || dueDate === '') {
            alert("Please enter todo title and description")
        } else{
            const obj = { title, description, dueDate, userId }
            console.log(obj);
            axios.post(endpoint, obj)
            .then((res)=>{
                console.log(res);
                fetchData();
                
            }).catch((err)=>{
                console.log(err);
            })

            setTitle("")
            setDesc("")
        }
    }

    // const toggleDone = (todo) => {
    //     const updatedStatus = !todo.isDone
    //     axios.post(checkbox_url, {id: todo._id, isDone: updatedStatus})
    //     .then((res)=> {
    //         const updatedTodos = display.map(item =>
    //             item._id === todo._id ? res.data : item
    //           );
    //           setDisplay(updatedTodos);
    //     }).catch((err)=>{
    //         console.log(err);
            
    //     })
    // }


    useEffect(()=>{
        fetchData()
    },[])


    const fetchData = async() =>{
       axios
       .get(answer)
       .then((res)=>{
        console.log(res.data.message);
        const allTodo = res.data.message || []
        const userTodo = allTodo.filter((todo) => todo.userId=== userId)
        console.log(userTodo);
        allTodo.forEach(todo => {
            console.log("todo.userId:", todo.userId, "type:", typeof todo.userId);
          });
        
        setDisplay(userTodo)
        
       }).catch((err)=>{
        console.log(err);
        
       })
    }

    const formDate = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleString()
    }

    
    const deleteInfo = (id) =>{1
        const confirmDelete = confirm("Are you sure you want to delete")
        console.log(confirmDelete);
        if(confirmDelete === true){
            axios.post(delete_url, {id})
            .then((res)=>{
                console.log(res);
                const updatedDisplay = display.filter((todo) => todo._id !== id);
                console.log(updatedDisplay);
                
                setDisplay(updatedDisplay);
                
            }).catch((err)=>{
                console.log(err);
                
            })
        }else{
            console.log("It can not deleted");
            
        }
        
        
    }

    const editTodo = (todo) => {
       setSelectedTodo(todo);
       setShowModal(true)
    }

    const handleSaveEdit = (updatedTodo) => {
        console.log(updatedTodo);
        // const update = {title: updatedTodo.title, description:updatedTodo.description, date: updatedTodo.date}
        axios.post(update_url, updatedTodo)
        
        .then((res)=> {
            console.log(res);
            
            const updatedList = display.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo)
            setDisplay(updatedList)
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }


  return (
    <>
        <form action="" className='col-xl-7 col-11 mx-auto my-5 p-5 shadow text-center '>
            <h3>{user.email     }</h3>
            <h2 className='mb-3'>Task Tracker</h2>
            <input type="text" name="title" placeholder='Enter what to do' className='form-control shadow-none' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" name="description" placeholder='Enter description' className='form-control shadow-none my-3' value={description} onChange={(e)=>setDesc(e.target.value)}/>
            <input type="datetime-local" name="dueDate"  className='form-control shadow-none my-3'  onChange={(e)=>setDueDate(e.target.value)}/>
            <button className='btn btn-primary w-100' onClick={todoInfo}>Add Todo</button>
        </form>

        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>  
            </thead>
            <tbody>
                {display.map((item, index) => (
                    <tr key={index}>
                    <td style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}>
                        {item.title}
                    </td>
                    <td style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}>
                        {item.description}
                    </td>
                    <td>{formDate(item.dueDate)}</td>
                    <td>
                        <input
                        type="checkbox"
                        name='isDone'
                        checked={item.isDone || false}
                        onChange={() => toggleDone(item)}
                        />
                        <button className='btn btn-success ms-2' onClick={() => editTodo(item)}>Edit</button>
                        <button className='btn btn-danger ms-2' onClick={() => deleteInfo(item._id)}>Delete</button>
                    </td>
                    </tr>
                ))}
            </tbody>
            {/* <tbody>
                {
                    display.map((todo) =>{           
                        return(
                            <tr key={todo._id}>
                                <td style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>{todo.title}</td>
                                <td style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>{todo.description}</td>
                                <td>{formDate(todo.dueDate)}</td>
                                <td>
                                <input
                                    type="checkbox"
                                    name='isDone'
                                    checked={todo.isDone || false}
                                    onChange={() => toggleDone(todo)}
                                />
                                    <button className='btn btn-success' onClick={editTodo}>Edit</button>
                                    <button className='btn btn-danger ms-3' onClick={()=>deleteInfo(todo._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody> */}
        </table>

        <Modal
            show = {showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSaveEdit}
            todo = {selectedTodo}
        />


       
    </>
  )
}

export default Home