import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavBar from './components/navbar/navbar'
import SideBar from './components/sidebar_menu/sidebar'

import Home from './pages/home/Home'
import About from './pages/about/about'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Logout from './pages/auth/logout'
import Profile from './pages/profile/profile'
import Manager from './pages/manager/manager'
import Generator from './pages/generator/generator'

import './App.css'
import Modal from './components/modal/modal'

function App() {
  const sites = {
    "Gestor de credenciales": "/manager",
    "Generador de contraseñas": "/generator",
    "Acerca de": "/about",
  }
  return (
    <>
      <Modal/>
      <NavBar sites={sites} />
      <div className='view'>
        <SideBar sites={sites} />
        <main className='page-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/manager' element={<Manager />} />
            <Route path='/generator' element={<Generator />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
