import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import './index.css'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const[showLogin,setShowLogin] = useState(false)

  return (  
    <>    
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
       <Route exact path='/' element={<Home/>} />
       <Route exact path='/cart' element={<Cart/>} />
       <Route exact path='/order' element={<PlaceOrder/>} />
       <Route path="/verify" element={<Verify />} />
       <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
