import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
 


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
      console.log(values);
      axios.post(url, values)
      .then((response)=>{
        console.log(response);
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
      <section className='container-fluid bg-color'>
        <div className='row bg col-xl-8 col-xxl-8 col-lg-8 col-md-8 col-sm-11  rounded-5 mx-auto p-5 shadow'>
            <form onSubmit={formik.handleSubmit} className='row'>
            <div className='text-center'>
                <h3>Signup</h3>
            </div>
            <small>{message}</small>
            <div className='col-xl-7 col-xxl-7 col-lg-7 col-md-7 col-sm-11 mx-auto py-4' >
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
            </div>
            <div className='col-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5 py-2'>
                <div>
                <button type='submit' className='btn btn-info w-100 rounded-pill my-3' disabled={!formik.isValid && !formik.isSubmitting}>Submit</button>
                <p className='text-center'>Already having an account? &nbsp;<a href="/login"> login here</a></p>
                </div>
                {/* <h5 className='text-center'>OR</h5>
                <div>
                <button className='btn border border-black w-100 mb-4' onClick={handleGoogle}><img src="/images/Google.png" alt="" width={'30px'}/>signup with facebook</button>
                <button className='btn border border-black w-100'><i class="fa-brands fa-facebook"></i>&nbsp; signup with google</button>
                </div> */}
            </div>
            </form>
        </div>
      </section>


    </>

  )
}

export default Signup