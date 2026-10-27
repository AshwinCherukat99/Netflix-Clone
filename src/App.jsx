import React,{useEffect,useState} from 'react'
import Home from './pages/Home/Home'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player' 
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = () => {  
  const navigate=useNavigate() 
  const [user,setUser]=useState(null)
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
      if (currentUser){
        console.log("Logged In")
        setUser(currentUser)
      }else{
        console.log("Logged Out")
        setUser(null)
        navigate('/login')
      }
    }) 
    return ()=>unsubscribe()
  },[])
  return (
    <div> 
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={user?<Home/>:<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={user?<Player/>:<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
