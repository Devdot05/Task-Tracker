import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from "axios"
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

const Login = () => {
  
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const url = 'https://task-tracker-gzvf.vercel.app/user/login'

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: (values) => {
      setLoading(true) // Show spinner
      axios.post(url, values)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Login Successful');
            
            const id = response.data.user._id;
            const users = response.data.user;
            const userDetails = {
              firstName:users.firstName,
              lastName: users.lastName,
              _id: users._id
            }

            localStorage.setItem("users", JSON.stringify(userDetails))
            localStorage.token = response.data.token

            setTimeout(() => {
              setLoading(false)
              navigate(`/dashboard/${id}`)
            }, 1000); // Optional delay for spinner effect

          } else {
            setMessage(response.data.message)
            setLoading(false)
          }

        }).catch((err) => {
          console.log(err);
          setLoading(false)
        })
    }, 

    validationSchema: yup.object({
      email: yup.string().email('invalid email format').required('email is required'),
      password: yup.string().required('password is required')
    })
  })

  return (
    <>
      <section className=' vh-100 container-fluid pt-5 d-none d-sm-block section' style={{ padding: '60px 0 60px 0'}}>
        <div className='row text-center col-xl-6 col-xxl-6 col-lg-6 col-md-8 col-sm-11 py-5 rounded-5 mx-auto shadow'>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className='col-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10  mx-auto'>
              <div>
                <h1 className=''>Welcome Back</h1>
              </div>
              <div className='text-start'>
                <input
                  type="email"
                  name='email'
                  placeholder='enter you email'
                  className='form-control shadow-none mt-3'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                <small className='text-danger rounded-pill'>{formik.touched.email && formik.errors.email}</small>
              </div>
              <div className='text-start'>
                <input
                  type="password"
                  name='password'
                  placeholder='enter your password'
                  className='form-control shadow-none mt-3'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <small className='text-danger'>{formik.touched.password && formik.errors.password}</small>
              </div>
              <small className='text-danger'>{message}</small>
              <button type='submit' className='btn btn-success w-100 my-3 rounded-pill'>Login</button>
              <p className='text center'>You don't have account with us <a href="/signup">Register here</a></p>
            </form>
          )}

        </div>
      </section>
      <section className=' vh-100 container-fluid pt-5 d-block d-sm-none section' style={{backgroundColor: '#CFE2FF'}}>
        <div className='row text-center col-xl-6 col-xxl-6 col-lg-6 col-md-8 col-sm-11 py-5 rounded-5 mx-auto'>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className='col-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10  mx-auto'>
              <h1 className=''>Welcome Back</h1>
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
              <button type='submit' className='btn btn-success w-100 my-3 rounded-pill'>Login</button>
              <p className='text center'>You don't have account with us <a href="/signup">Register here</a></p>
            </form>
          )}

        </div>
      </section>

      {/* Spinner CSS */}
      <style>{`
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(0,0,0,0.1);
          border-top-color: #198754;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        section{
        background-image: '/images/todo 1.jpeg'
        }
      `}</style>
    </>
  )
}

export default Login
