import axios from 'axios';
import React from 'react'
import  { useState, useEffect } from 'react'
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';    

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [dueDate, setDueDate] = useState('')
    const [display, setDisplay] = useState([])
    const [showModal, setShowModal] = useState (false)
    const [selectedTodo, setSelectedTodo] = useState (null)
    const endpoint = 'https://task-tracker-q8jo.vercel.app/addTodo'
    const answer = 'https://task-tracker-q8jo.vercel.app/submittedTodo'
    const delete_url = 'https://task-tracker-q8jo.vercel.app/delete'
    const update_url = 'https://task-tracker-q8jo.vercel.app/update'
    const checkbox_url = 'https://task-tracker-q8jo.vercel.app'; // Corrected URL


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


    // ... (other imports and state variables) ...



const toggleDone = async (todo) => {
    try {
        const response = await axios.put(`${checkbox_url}/${todo._id}`, {
            done: !todo.isDone
        });

        const updatedTodos = display.map(item =>
            item._id === todo._id ? response.data : item
        );
        setDisplay(updatedTodos);
    } catch (error) {
        console.error('Error toggling task:', error);
        // Handle error (e.g., display an error message to the user)
    }
};

// ... (rest of your component) ...



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
        <section style={{backgroundColor: '#E2E3E5', paddingTop: '30px'}} >
            <form action="" className='col-xl-7 col-11 mx-auto p-5  text-center '>
                <div className='mb-3'>
                    <h3>Welcome! <span>{user.firstName}</span>&nbsp;<span>{user.lastName}</span></h3>
                </div>
                <h2 className='mb-3'>Task Tracker</h2>
                <input type="text" name="title" placeholder='Enter what to do' className='form-control shadow-none' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" name="description" placeholder='Enter description' className='form-control shadow-none my-3' value={description} onChange={(e)=>setDesc(e.target.value)}/>
                <input type="datetime-local" name="dueDate"  className='form-control shadow-none my-3'  onChange={(e)=>setDueDate(e.target.value)}/>
                <button className='btn btn-primary w-100' onClick={todoInfo}>Add Todo</button>
            </form>

            <table className='table table-secondary table-bordered' style={{backgroundColor: '#D6E4ED'}}>
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
                            <Tooltip
                            title="Edit Task" 
                                arrow 
                                placement="bottom" 
                                sx={{
                                    fontSize: '1rem'
                                }}
                            >
                            <IconButton aria-label="edit" className='text-success' onClick={() => editTodo(item)}>
                                <EditIcon />
                            </IconButton>
                            </Tooltip>
                            <Tooltip 
                                title="Delete Task" 
                                arrow 
                                placement="bottom" 
                                sx={{
                                    fontSize: '1rem'
                                }}
                                >
                            <IconButton
                                className='text-danger'
                                onClick={() => deleteInfo(item._id)}
                            >
                            <DeleteIcon sx={{ fontSize: 24 }} />
                            </IconButton>
                            </Tooltip>
                            
                        </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <Modal
                show = {showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveEdit}
                todo = {selectedTodo}
            />
        </section>

         
    </>
  )
}

export default Home