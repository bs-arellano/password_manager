import { Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Logout from './pages/auth/logout'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  )
}

export default App
