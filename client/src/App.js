import React from 'react'
import {Routes,Route} from "react-router-dom"
import Settings from './Page/Settings'
import Home from './Page/Home/Home'
import RegisterPage from './Component/registrationPage/RegisterPage'
import Login from './Component/loginPage/Login'
import Signup from './Component/signup/Signup'
import Assignment from './Page/Assignment/Assignment'
import Task from './Page/Task/Task'
import TeamMember from './Page/Team/TeamMember'

import CreateTeam from './Page/Team/CreateTeam/CreateTeam'


export default function App() {
  return (
 <>
  
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/team' element={<TeamMember/>}></Route>
        <Route path='/assignment' element={<Assignment/>}></Route>
        <Route path='/task' element={<Task/>}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/registerpage' element={<RegisterPage/>}></Route>
        <Route path='/loginpage' element={<Login/>}></Route>
        <Route path='/signuppage' element={<Signup/>}></Route>
        <Route path='/createteam/:EmployeeID' element={<CreateTeam/>}></Route>

    </Routes>
 
 </>
  )
}

