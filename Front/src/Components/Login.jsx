import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

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
            const id = response.data.user._id;
            const userDetails = response.data.user;

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
    }
  })

  return (
    <>
      <section className='bg-color vh-100 container-fluid'>
        <div className='row bg text-center col-xl-8 col-xxl-8 col-lg-8 col-md-8 col-sm-11 p-5 rounded-5 mx-auto my-3 shadow'>
          <h1 className=''>Welcome Back</h1>
          <button type="button" class="btn btn-secondary"
        data-bs-toggle="tooltip" data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title="This top tooltip is themed via CSS variables.">
  Custom tooltip
</button>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className='col-6'>
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
          )}

          {!loading && (
            <div className='col-6 py-2 shadow'>
              <div className='d-flex gap-2'>
                <hr style={{ width: "100%" }} />
                <p>or</p>
                <hr style={{ width: "100%" }} />
              </div>
              <button className='btn border border-black w-100 mb-4'><img src="/images/Google.png" alt="" width={'30px'} />signup with facebook</button>
              <button className='btn border border-black w-100'><i className="fa-brands fa-facebook"></i>&nbsp; signup with google</button>
            </div>
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
      `}</style>
    </>
  )
}

export default Login
