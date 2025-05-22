import React, { useEffect, useState } from 'react'

const Modal = ({show, onClose, onSave, todo}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    useEffect(()=>{
        if(todo) {
            setTitle(todo.title)
            setDescription(todo.description)
            setDate(todo.date || '')
        }
    }, [todo])

    const handleSave = () => {
        onSave({...todo, title, description, date})
        onClose();
    }

    if(!show) return null;
  return (
    <>
        <div className="modal show fade d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Todo</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className='mb-3'>
                    <input type="text" name='title' className='form-control' onChange={(e) => setTitle (e.target.value)} placeholder='title'/>
                </div>
                <div className='mb-3'>
                    <input type="text" name='description' className='form-control' onChange={(e) => setDescription (e.target.value)} placeholder='description'/>
                </div>
                <div className='mb-3'>
                    <input type="datetime-local" name='date' className='form-control' onChange={(e) => setDate (e.target.value)} placeholder='date/time'/>
                </div>
            </div>
            <div className="modal-footer">
                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button> */}
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Modal