import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { backdropClasses } from '@mui/material'
 


const Signup = () => {
  const url = "https://task-tracker-gzvf.vercel.app/user/register"
  const navigate = useNavigate()
 
  const [message, setMessage] = useState('')
 
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },

    
    
    onSubmit: (values) => {
      axios.post(url, values)
      .then((response)=>{
        if(response.data.status) {
          navigate('/login')
        }else{
          setMessage(response.data.message)
          
        }
        
      }).catch((err)=>{
        console.log(err);
        
      })
      
    },

    validationSchema: yup.object({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      email: yup.string().email('invalid email format').required('email is required'),
      password: yup.string().required('password is required').min(6, "most not be less than 6 characters")
    })

    
  })
   
  


  
  return (
    <>
      <section className='container-fluid vh-100 d-none d-sm-block section' style={{backgroundColor: '#CFE2FF', padding: '20px 0 60px 0'}}>
        <div className='row bg col-xl-6 col-xxl-6 col-lg-6 col-md-8 col-sm-11  rounded-5 mx-auto shadow'>
          <form onSubmit={formik.handleSubmit} className='col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 mx-auto py-5'>
            <div className='text-center mb-3'>
              <h1>Signup</h1>
            </div>
           <div className="text-center mb-2 text-danger">
            <small>{message}</small>
           </div>
            <div>
              <input type="text" 
              name='firstName'
              placeholder='Enter your first name'
              className='form-control shadow-none'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
                <small className='text-danger'>{formik.touched.firstName && formik.errors.firstName}</small>
            </div>
            <div>
              <input type="text" 
              name='lastName'
              placeholder='Enter your last name'
              className='form-control mt-3 shadow-none'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              <small className='text-danger'>{formik.touched.lastName && formik.errors.lastName}</small>
            </div>
            <div>
              <input type="email" 
              name='email'
              placeholder='Enter your email'
              className='form-control mt-3 shadow-none'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              <small className='text-danger rounded-pill'>{formik.touched.email && formik.errors.email}</small>
            </div>
            <div>
              <input type="password" 
              name='password'
              placeholder='Create a your password'
              className='form-control mt-3 shadow-none'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              <small className='text-danger'>{formik.touched.password && formik.errors.password}</small>
            </div>
            <div>
              <button type='submit' className='btn btn-info w-100 rounded-pill my-3' disabled={!formik.isValid && !formik.isSubmitting}>Submit</button>
              <p className='text-center'>Already having an account? &nbsp;<a href="/login"> login here</a></p>
            </div>
          </form>
        </div>
      </section>

      <section className='container-fluid vh-100 d-block d-sm-none section' style={{backgroundColor: '#CFE2FF'}}>
        <div className='row col-xl-6 col-xxl-6 col-lg-6 col-md-8 col-sm-11  rounded-5 mx-auto'>
          <form onSubmit={formik.handleSubmit} className='col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 mx-auto py-5'>
            <div className='text-center mb-3'>
              <p>Signup</p>
            </div>
            <small>{message}</small>
            <div>
              <input type="text" 
              name='firstName'
              placeholder='Enter your first name'
              className='form-control shadow-none'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
                <small className='text-danger'>{formik.touched.firstName && formik.errors.firstName}</small>
            </div>
            <div>
              <input type="text" 
              name='lastName'
              placeholder='Enter your last name'
              className='form-control mt-3 shadow-none'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              <small className='text-danger'>{formik.touched.lastName && formik.errors.lastName}</small>
            </div>
            <div>
              <input type="email" 
              name='email'
              placeholder='Enter your email'
              className='form-control mt-3 shadow-none'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              <small className='text-danger rounded-pill'>{formik.touched.email && formik.errors.email}</small>
            </div>
            <div>
              <input type="password" 
              name='password'
              placeholder='Create a your password'
              className='form-control mt-3 shadow-none'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              <small className='text-danger'>{formik.touched.password && formik.errors.password}</small>
            </div>
            <div>
              <button type='submit' className='btn btn-info w-100 rounded-pill my-3' disabled={!formik.isValid && !formik.isSubmitting}>Submit</button>
              <p className='text-center'>Already having an account? &nbsp;<a href="/login"> login here</a></p>
            </div>
          </form>
        </div>
      </section>


    </>

  )
}

export default Signup
