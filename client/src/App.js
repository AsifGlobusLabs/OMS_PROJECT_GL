import React from 'react'
import {Routes,Route} from "react-router-dom"
import Settings from './Page/Settings'
import Home from './Page/Home/Home'
import RegisterPage from './Component/registrationPage/RegisterPage'
import Login from './Component/loginPage/Login'
import Signup from './Component/signup/Signup'

import Task from './Page/Task/Task'
// import TeamMember from './Page/Team/TeamMember'

import TeamMember from './Page/Team/AllTeamMembers'
import Create from './Page/Team/CreateGroup/Create'
// import CreateTeam from './Page/Team/CreateTeam/CreateTeam'
import ViewEmployee from './Page/viewEmployee/ViewEmployee'
import Department from './Page/Department/Department'
import NewAssignment from './Page/Assignment/NewAssignment'


export default function App() {
  return (
 <>
  
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/viewEmployee' element={<ViewEmployee/>}></Route>
        <Route path='/Department' element={<Department/>}></Route>
        <Route path='/team' element={<TeamMember/>}></Route>
        <Route path='/assignment' element={<NewAssignment/>}></Route>
        <Route path='/task' element={<Task/>}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/newEmployee' element={<RegisterPage/>}></Route>
        <Route path='/loginpage' element={<Login/>}></Route>
        <Route path='/signuppage' element={<Signup/>}></Route>
        <Route path='/createteam/:EmployeeID' element={<Create/>}></Route>

    </Routes>
 
 </>
  )
}

