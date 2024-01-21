import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './components/home/Homepage';
import Loginpage from './components/login/Loginpage';
import Registerpage from './components/register/Registerpage';
import Dashboard from './components/dashboard/Dashboard';
import Myprofile from './components/myprofile/Myprofile';
import Individualprofile from './components/indprofile/Individualprofile';
const App = () => {
  return (
    
    <Router>
      <div>
        <Routes>
          <Route path='/' element={ <Homepage/>}></Route>
          <Route path='/login' element={ <Loginpage/>}></Route>
          <Route path='/register' element={ <Registerpage/>}></Route>
          <Route path='/dashboard' element={ <Dashboard/>}></Route>
          <Route path='/myprofile' element={ <Myprofile/>}></Route>
          <Route path='/individualprofile/:fullname/:email/:skillls/:mobile/:id' element={ <Individualprofile/>}></Route>
        </Routes>
      </div>
    </Router>
   
  )
}

export default App