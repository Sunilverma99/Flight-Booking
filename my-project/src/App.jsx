import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Signin from './pages/Sign-in';
import Signup from './pages/Signup.jsx'
import Header from './components/Header.jsx';
import FooterCom from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute .jsx";
import { Toaster } from 'react-hot-toast';
import Search from './pages/Search.jsx';
import About from './pages/About.jsx';
import AddFlight from './pages/AddFlight.jsx';
import Contact from './pages/Contact.jsx';
import MyBooking from './pages/MyBooking.jsx';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
       <Route  path="/" element={<Home/>}/>
       <Route  path="/sign-in" element={<Signin/>}/>
       <Route  path="/sign-up" element={<Signup/>}/>
       <Route  path="/search" element={<Search/>}/>
       <Route  path="/about" element={<About/>}/>
       <Route  path="/contact" element={<Contact/>}/>
       <Route  path="/myBooking" element={<MyBooking/>}/>
       <Route  element={<PrivateRoute/>}>
       <Route  path="/addFlight" element={<AddFlight/>}/>
       </Route>
       <Route  element={<OnlyAdminPrivateRoute/>}>
       {/* <Route  path="/" element={}/>
       <Route path ="/" element={}/> */}
       </Route>
       {/* <Route path='/' element={} /> */}
    </Routes>
    <FooterCom/>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App