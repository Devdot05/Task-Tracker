import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import {userNavigate} from 'react-router-dom'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Layout from './Components/Layout'
import { Navigate, Route, Routes, } from 'react-router-dom'
import Navbar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)
  let token = localStorage.getItem('token')
  

  return (
    <>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Navigate to = '/signup'/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/dashboard/:id' element={<User_profile/>}/> */}
        <Route path='/dashboard/:userId' element={token ? <Home/> : <Navigate to= "/login"/>} />
         
      </Routes>
    </>
  )
}

export default App
