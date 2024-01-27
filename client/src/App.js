import React from 'react'
import {Routes,Route} from "react-router-dom"
import Product from './Page/Product'
import AddProduct from './Page/AddProduct'
import Settings from './Page/Settings'
import Home from './Page/Home/Home'
import RegisterPage from './Component/registrationPage/RegisterPage'
import Login from './Component/loginPage/Login'
import Signup from './Component/signup/Signup'


export default function App() {
  return (
 <>
  
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/addproduct' element={<AddProduct />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/registerpage' element={<RegisterPage/>}></Route>
        <Route path='/loginpage' element={<Login/>}></Route>
        <Route path='/signuppage' element={<Signup/>}></Route>

    </Routes>
 
 </>
  )
}

