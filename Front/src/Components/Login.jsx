import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
 

const Login = () => {
  const [message, setMessage] = useState('')
  let navigate = useNavigate()
  const url = 'http://localhost:5555/login'

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: (values) => {
      console.log(values);
      axios.post(url, values)
      .then((response) => {
        console.log(response);
        if(response.data.status === true){
          console.log("user found");
          const id = response.data.user._id;
          const userDetails = response.data.user
          
          console.log(id);
          localStorage.setItem("users", JSON.stringify(userDetails))
          localStorage.token = response.data.token
          console.log(response.data.token);
          
          navigate(`/dashboard/${id}`)
          
          
        }else{
          setMessage(response.data.message)
          console.log('user not found');
           
        }
        
      }).catch((err) => {
        console.log(err);
        
      })
      
    }
  })
  // console.log(formik.values);
  
  return (
    <>
      <section className='bg-color vh-100 container-fluid'>
        <div action="" onSubmit={formik.handleSubmit} className='row bg text-center col-xl-8 col-xxl-8 col-lg-8 col-md-8 col-sm-11 p-5 rounded-5 mx-auto my-3 shadow'>
        <h1 className=''>Welcome Back</h1>
          <form className='col-6'>
            <input 
              type="email"
              name='email' 
              placeholder='enter you email'
              className='form-control shadow-none mt-3' 
              onChange={formik.handleChange}
            />
            <input 
              type="password"
              name='password' 
              placeholder='enter your password' 
              className='form-control shadow-none mt-3'
              onChange={formik.handleChange}
            />
            <small className='text-danger'>{message}</small>
            <button type='submit' className='btn btn-success w-100 my-3'>Login</button>
            <p className='text center'>You don't have account with us <a href="/signup">Register here</a></p>
          </form>
          <div className='col-6 py-2 shadow'>
             <div className='d-flex gap-2'>
                <hr style={{width:"100%"}}/>
                <p>or</p>
                <hr style={{width:"100%"}}/>
             </div>
              <button className='btn border border-black w-100 mb-4'><img src="/images/Google.png" alt="" width={'30px'}/>signup with facebook</button>
              <button className='btn border border-black w-100'><i class="fa-brands fa-facebook"></i>&nbsp; signup with google</button>
          </div>
        </div>
        
      </section>
    </>
  )
}

export default Login